require('dotenv').config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

// Replace this connection string with your own MongoDB connection string

//bring in MONGODB_URI from .env file
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});

// API routes

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
