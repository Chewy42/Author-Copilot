const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Ebook = require("../models/Ebook");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/user/:id", authenticate, async (req, res) => {
  const userId = req.params.id;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SECRET);

  if (userId !== decodedToken.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Get request with user's id that will return their name
router.get("/user/:id/name", authenticate, async (req, res) => {
  const userId = req.params.id;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SECRET);

  if (userId !== decodedToken.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findById(userId, "name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/user/:id/ebooks", authenticate, async (req, res) => {
  const userId = req.params.id;

  try {
    const ebooks = await Ebook.find({ ownerId: userId }).populate(
      "ownerId",
      "name email"
    );
    res.json(ebooks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Name validation rules
  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({
      message:
        "Name should be at least 2 characters long and contain only letters and spaces",
    });
  }

  // Email validation rules
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  // Password validation rules
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password should be at least 6 characters long and contain at least one uppercase letter, one special character, and one number",
    });
  } else if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Sign in route

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/update/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const updates = {};
  
  // Check which fields were changed and add them to the updates object
  if (req.body.name) {
    updates.name = req.body.name;
  }
  if (req.body.email) {
    updates.email = req.body.email;
  }
  if (req.body.password) {
    updates.password = await bcrypt.hash(req.body.password, 12);
  }

  //NEEDS TO BE ENCRYPTED BEFORE LAUNCH
  if (req.body.openaiApiKey) {
    updates.openaiApiKey = req.body.openaiApiKey;
  }
  if (req.body.openaiOrgId) {
    updates.openaiOrgId = req.body.openaiOrgId;
  }

  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Check if the email being updated already exists
    if (req.body.email && req.body.email !== existingUser.email) {
      const userWithEmail = await User.findOne({ email: req.body.email });
      if (userWithEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (existingUser._id.toString() !== decodedToken.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await User.findByIdAndUpdate(id, updates);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});



router.delete("/delete", authenticate, async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await existingUser.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
