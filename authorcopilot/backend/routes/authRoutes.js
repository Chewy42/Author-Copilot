const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({message: "Invalid token"});
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
};

router.get("/api/user", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Send user data back to client
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post("/signup", async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    // Password validation rules
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password should be at least 6 characters long and contain at least one uppercase letter, one special character, and one number",
        });
    }else if(password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
        });
    }

    try {
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({name, email, password: hashedPassword});

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({token, newUser});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// Sign in route

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isValidPassword) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({token, existingUser});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.put("/update", authenticate, async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        if (existingUser._id.toString() !== req.user.id) {
            return res.status(403).json({message: "Forbidden"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        existingUser.password = hashedPassword;

        await existingUser.save();

        res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.delete("/delete", authenticate, async (req, res) => {
    const {email} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        if (existingUser._id.toString() !== req.user.id) {
            return res.status(403).json({message: "Forbidden"});
        }

        await existingUser.remove();

        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

module.exports = router;