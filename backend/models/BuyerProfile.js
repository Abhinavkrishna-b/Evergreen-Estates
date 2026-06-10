const mongoose = require("mongoose");

const buyerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    savedPropertyIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        // Property model doesn't exist 
      },
    ],

    stats: {
      totalSaved: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const BuyerProfile = mongoose.model("BuyerProfile", buyerProfileSchema);

module.exports = BuyerProfile;
