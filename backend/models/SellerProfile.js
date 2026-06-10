const mongoose = require("mongoose");

const sellerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
      trim: true,
      default: null,
    },

    stats: {
      totalListings: { type: Number, default: 0 },
      activeListings: { type: Number, default: 0 },
      pendingListings: { type: Number, default: 0 },
      totalInquiriesReceived: { type: Number, default: 0 },
      sellerRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    upgradedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SellerProfile = mongoose.model("SellerProfile", sellerProfileSchema);

module.exports = SellerProfile;