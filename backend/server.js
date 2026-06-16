const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/users",      require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Server is running. Models loaded." });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});