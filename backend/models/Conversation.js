const mongoose = require("mongoose");

// A conversation is created when a buyer first messages
// a seller about a specific property.
// One conversation per buyer-seller-property combination.
// All messages about that property between those two people
// live inside this one document.

const conversationSchema = new mongoose.Schema(
  {
    // The property being discussed
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    // The buyer who initiated the conversation
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The seller who owns the property
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Last message text - shown in conversation list preview
    // Updated every time a new message is sent
    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },

    // Unread counts per user
    // Incremented when a message is received
    // Reset to 0 when that user opens the conversation
    unreadBuyer: {
      type: Number,
      default: 0,
    },

    unreadSeller: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index - ensures only ONE conversation
conversationSchema.index(
  { propertyId: 1, buyerId: 1, sellerId: 1 },
  { unique: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;