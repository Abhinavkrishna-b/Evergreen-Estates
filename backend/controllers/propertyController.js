const Property = require("../models/Property");
const SellerProfile = require("../models/SellerProfile");

const createProperty = async (req, res) => {
  try {
    const {
      title, description, purpose, propertyType, price,
      state, city, locality, fullAddress,
      latitude, longitude,
      facingDirection, area,
      configuration, beds, baths, furnishing, parking, policies,
      approvalAuthority, soilType, waterSource, electricity,
      coverImage, images, badge,
    } = req.body;

    // Validate required fields
    if (
      !title || !description || !purpose || !propertyType ||
      !price || !state || !city || !locality ||
      !fullAddress || !latitude || !longitude || !area
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Create property
    const property = await Property.create({
      sellerId: req.user.userId,
      title, description, purpose, propertyType, price,
      state, city, locality, fullAddress,
      latitude, longitude,
      facingDirection, area,
      configuration, beds, baths, furnishing, parking, policies,
      approvalAuthority, soilType, waterSource, electricity,
      coverImage: coverImage || null,
      images: images || [],
      badge: badge || null,
      verification: { status: "pending" },
    });

    // Update seller stats
    await SellerProfile.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $inc: {
          "stats.totalListings": 1,
          "stats.pendingListings": 1,
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Property submitted for verification",
      data: { property },
    });

  } catch (error) {
    console.error("Create property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const {
      city, purpose, propertyType,
      minPrice, maxPrice, beds,
    } = req.query;

    const filter = { "verification.status": "approved" };

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (purpose) {
      filter.purpose = purpose;
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (beds) {
      filter.beds = Number(beds);
    }

    const properties = await Property.find(filter)
      .populate("sellerId", "fullName avatarUrl phone")
      .sort({ createdAt: -1 });
      // Newest listings first

    res.status(200).json({
      success: true,
      count: properties.length,
      data: { properties },
    });

  } catch (error) {
    console.error("Get properties error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("sellerId", "fullName avatarUrl phone");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.findByIdAndUpdate(req.params.id, {
      $inc: { "stats.views": 1 },
    });

    res.status(200).json({
      success: true,
      data: { property },
    });

  } catch (error) {
    console.error("Get property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
    });
  }
};

const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      sellerId: req.user.userId,
    }).sort({ createdAt: -1 });

    // Returns ALL statuses: pending, approved, rejected

    res.status(200).json({
      success: true,
      count: properties.length,
      data: { properties },
    });

  } catch (error) {
    console.error("Get my properties error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your properties",
    });
  }
};


const updateProperty = async (req, res) => {
  try {
    // Find the property 
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.sellerId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own properties",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        "verification.status": "pending",
        "verification.reviewedBy": null,
        "verification.reviewedAt": null,
        "verification.rejectionReason": null,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (property.verification.status === "approved") {
      await SellerProfile.findOneAndUpdate(
        { userId: req.user.userId },
        {
          $inc: {
            "stats.activeListings": -1,
            "stats.pendingListings": 1,
          },
        }
      );
    } else if (property.verification.status === "rejected") {
      await SellerProfile.findOneAndUpdate(
        { userId: req.user.userId },
        {
          $inc: {
            "stats.pendingListings": 1,
          },
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Property updated. Resubmitted for verification.",
      data: { property: updatedProperty },
    });

  } catch (error) {
    console.error("Update property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (property.sellerId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own properties",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    const statusField =
      property.verification.status === "approved"
        ? "stats.activeListings"
        : property.verification.status === "pending"
        ? "stats.pendingListings"
        : null;

    const update = { $inc: { "stats.totalListings": -1 } };
    if (statusField) update.$inc[statusField] = -1;

    await SellerProfile.findOneAndUpdate(
      { userId: req.user.userId },
      update
    );

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    console.error("Delete property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};

module.exports = {
  createProperty, getProperties, getPropertyById, getMyProperties, updateProperty, deleteProperty
};
