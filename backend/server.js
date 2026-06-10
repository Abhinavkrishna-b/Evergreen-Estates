const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

const User = require("./models/User");
const BuyerProfile = require("./models/BuyerProfile");
const SellerProfile = require("./models/SellerProfile");

app.get("/", (req, res) => {
  res.json({ message: "Server is running. Models loaded." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});