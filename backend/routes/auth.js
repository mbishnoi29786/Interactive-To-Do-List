// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator'); // For validating email format
const router = express.Router();

// Helper function to validate email format
function isValidEmail(email) {
    return validator.isEmail(email);
}

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password || !cpassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Validate password requirements (min length, uppercase, special char, etc.)
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one lowercase letter' });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one number' });
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one special character' });
        }

        // Check if password and confirm password match
        if (password !== cpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });

        // Respond with token
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error, please try again' });
    }
});

module.exports = router;
