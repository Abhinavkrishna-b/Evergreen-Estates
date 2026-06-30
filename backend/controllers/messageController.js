const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// START OR GET CONVERSATION
// POST /api/messages/conversations
const startOrGetConversation = async (req, res) => {
  try {
    const { propertyId, sellerId } = req.body;
    const buyerId = req.user.userId;

    if (!propertyId || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "Property and seller are required",
      });
    }

    if (buyerId === sellerId) {
      return res.status(400).json({
        success: false,
        message: "You cannot message yourself",
      });
    }

    let conversation = await Conversation.findOne({
      propertyId,
      buyerId,
      sellerId,
    })
      .populate("propertyId", "title coverImage city locality")
      .populate("buyerId", "fullName avatarUrl")
      .populate("sellerId", "fullName avatarUrl");

    if (conversation) {
      return res.status(200).json({
        success: true,
        data: { conversation },
      });
    }

    const newConversation = await Conversation.create({
      propertyId,
      buyerId,
      sellerId,
    });

    const populated = await Conversation.findById(newConversation._id)
      .populate("propertyId", "title coverImage city locality")
      .populate("buyerId", "fullName avatarUrl")
      .populate("sellerId", "fullName avatarUrl");

    res.status(201).json({
      success: true,
      data: { conversation: populated },
    });

  } catch (error) {
    console.error("Start conversation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to start conversation",
    });
  }
};

// GET MY CONVERSATIONS
// GET /api/messages/conversations
const getMyConversations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const conversations = await Conversation.find({
      $or: [{ buyerId: userId }, { sellerId: userId }],
    })
      .populate("propertyId", "title coverImage city locality")
      .populate("buyerId", "fullName avatarUrl")
      .populate("sellerId", "fullName avatarUrl")
      .sort({ lastMessageAt: -1 });

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: { conversations },
    });

  } catch (error) {
    console.error("Get conversations error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
};

// GET MESSAGES IN A CONVERSATION
// GET /api/messages/conversations/:conversationId
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.userId;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    const isParticipant =
      conversation.buyerId.toString() === userId ||
      conversation.sellerId.toString() === userId;

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Mark messages as read for this user
    const isBuyer = conversation.buyerId.toString() === userId;
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        [isBuyer ? "unreadBuyer" : "unreadSeller"]: 0,
      },
    });

    const messages = await Message.find({ conversationId })
      .populate("senderId", "fullName avatarUrl")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: { messages },
    });

  } catch (error) {
    console.error("Get messages error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

// SEND MESSAGE
// POST /api/messages
const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = req.user.userId;

    if (!conversationId || !text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Conversation and message text are required",
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    const isParticipant =
      conversation.buyerId.toString() === senderId ||
      conversation.sellerId.toString() === senderId;

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const message = await Message.create({
      conversationId,
      senderId,
      text: text.trim(),
    });

    const populated = await Message.findById(message._id)
      .populate("senderId", "fullName avatarUrl");

    const isBuyer = conversation.buyerId.toString() === senderId;

    await Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        lastMessage: text.trim(),
        lastMessageAt: new Date(),
      },
      $inc: {
        [isBuyer ? "unreadSeller" : "unreadBuyer"]: 1,
      },
    });

    res.status(201).json({
      success: true,
      data: { message: populated },
    });

  } catch (error) {
    console.error("Send message error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = {
  startOrGetConversation,
  getMyConversations,
  getMessages,
  sendMessage,
};