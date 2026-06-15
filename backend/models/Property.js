const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    purpose: {
      type: String,
      enum: ["Buy", "Rent"],
      required: [true, "Purpose is required"],
    },

    propertyType: {
      type: String,
      enum: ["Villa", "Apartment", "House", "Land", "Agriculture Land"],
      required: [true, "Property type is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    coverImage: {
      type: String,
      default: null,
    },

    images: {
      type: [String],
      default: [],
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    locality: {
      type: String,
      required: [true, "Locality is required"],
      trim: true,
    },

    fullAddress: {
      type: String,
      required: [true, "Full address is required"],
      trim: true,
    },

    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
    },

    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
    },
    
    facingDirection: {
      type: String,
      enum: [
        "North", "South", "East", "West",
        "North-East", "North-West",
        "South-East", "South-West",
        "Facing Main Road",
        null,
      ],
      default: null,
    },

    // Unit determined by propertyType in frontend
    area: {
      type: String,
      required: [true, "Area is required"],
    },

    configuration: {
      type: String,
      // "1 BHK", "2 BHK" for buildings
      // "Farm Land", "Residential Plot" for land
      default: null,
    },

    beds: {
      type: Number,
      default: null,
    },

    baths: {
      type: Number,
      default: null,
    },

    furnishing: {
      type: String,
      enum: ["Unfurnished", "Semi Furnished", "Fully Furnished", null],
      default: null,
    },

    parking: {
      type: String,
      enum: [
        "1 Covered Parking",
        "2 Covered Parking",
        "Open Parking",
        null,
      ],
      default: null,
    },

    policies: {
      type: String,
      default: null,
    },

    approvalAuthority: {
      type: String,
      enum: [
        "Patta", "DTCP", "CMDA",
        "RERA", "Panchayat Approval",
        "Other", null,
      ],
      default: null,
    },

    soilType: {
      type: String,
      enum: [
        "Red Soil", "Black Soil",
        "Clay Soil", "Mixed Soil",
        "Other", null,
      ],
      default: null,
    },

    waterSource: {
      type: String,
      enum: [
        "Borewell", "Open Well",
        "River Water", "Canal Water",
        "None", null,
      ],
      default: null,
    },

    electricity: {
      type: String,
      enum: [
        "No Connection",
        "Single Phase",
        "Three Phase",
        null,
      ],
      default: null,
    },

    ownershipProof: {
      type: String,
      // URL of uploaded file

      default: null, //NULL untill backend is integrated
    //  required: [true, "Ownership proof is needed"],
    },

    approvalDocument: {
      type: String,
      //DTCP, CMDA, RERA doc

        default: null, //Later change to required
    //   required: [true, "Approval proof is needed"],
    },

    verification: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },

      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },

      reviewedAt: {
        type: Date,
        default: null,
      },

      rejectionReason: {
        type: String,
        default: null,
      },
    },

    badge: {
      type: String,
      enum: ["Featured", "Hot Deal", "New", "Smart", "Land", null],
      default: null,
    },

    stats: {
      views: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
    },
  },

  {
    timestamps: true,
  }
);

// INDEXES
// "Indexes are B-tree data structures that allow the query to jump directly to matching documents instead of scanning every document in the collection.
//  Without an index, MongoDB does a COLLSCAN (full scan)
//  which is O(n). With an index it's O(log n)."

// Most frequent query: PropertiesPage search
// Users filter by city + status + purpose + price
// Compound index matches this exact pattern
propertySchema.index({
  city: 1,
  "verification.status": 1,
  purpose: 1,
  price: 1,
});

// Seller dashboard: "My Properties"
// Runs on every SellerProfile page load
propertySchema.index({
  sellerId: 1,
  "verification.status": 1,
});

// Admin verification queue: all pending properties
// Sorted by oldest first (createdAt: 1)
propertySchema.index({
  "verification.status": 1,
  createdAt: 1,
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;

