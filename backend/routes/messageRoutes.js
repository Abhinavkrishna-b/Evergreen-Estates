const express = require("express");
const router = express.Router();
const {
  startOrGetConversation,
  getMyConversations,
  getMessages,
  sendMessage,
} = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

// All message routes require login
router.use(verifyToken);

router.post("/conversations", startOrGetConversation);
router.get("/conversations", getMyConversations);
router.get("/conversations/:conversationId", getMessages);
router.post("/", sendMessage);

module.exports = router;