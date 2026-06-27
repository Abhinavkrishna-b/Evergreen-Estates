const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const Message = require("./models/Message");
const Conversation = require("./models/Conversation");
const http = require("http");
const { Server } = require("socket.io");

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const server = http.createServer(app);
// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/users",      require("./routes/userRoutes"));
app.use("/api/messages",   require("./routes/messageRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Server is running. Models loaded." });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

    socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket joined conversation: ${conversationId}`);
  });

 socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
    try {
      // Save to DB
      const message = await Message.create({
        conversationId,
        senderId,
        text: text.trim(),
      });

      const populated = await Message.findById(message._id)
        .populate("senderId", "fullName avatarUrl");

      const conversation = await Conversation.findById(conversationId);

      const isBuyer = conversation.buyerId.toString() === senderId;
      const recipientId = isBuyer
        ? conversation.sellerId.toString()
        : conversation.buyerId.toString();

      await Conversation.findByIdAndUpdate(conversationId, {
        $set: {
          lastMessage: text.trim(),
          lastMessageAt: new Date(),
        },
        $inc: {
          [isBuyer ? "unreadSeller" : "unreadBuyer"]: 1,
        },
      });

      io.to(conversationId).emit("receiveMessage", populated);

      io.to(recipientId).emit("conversationUpdated", {
        conversationId,
        lastMessage: text.trim(),
        lastMessageAt: new Date(),
      });

    } catch (error) {
      console.error("Socket sendMessage error:", error.message);
      socket.emit("messageError", { message: "Failed to send message" });
    }
  });

  socket.on("markRead", async ({ conversationId, userId }) => {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) return;

      const isBuyer = conversation.buyerId.toString() === userId;
      await Conversation.findByIdAndUpdate(conversationId, {
        [isBuyer ? "unreadBuyer" : "unreadSeller"]: 0,
      });
    } catch (error) {
      console.error("markRead error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

