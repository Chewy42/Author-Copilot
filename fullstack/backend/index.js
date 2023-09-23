require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressWs = require('express-ws');
const app = express();
expressWs(app);

app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors());

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
const chatRoutes = require('./routes/chatRoute');

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/auth", authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});