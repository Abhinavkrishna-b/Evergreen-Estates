const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // Which conversation this message belongs to
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    // Who sent this message
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The actual message text
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // Has the receiver read this message
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for fast message fetching by conversation
// sorted by creation time
messageSchema.index({ conversationId: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;