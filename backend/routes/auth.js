// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator'); // For validating email format
const { checkEmailExists, validatePassword } = require('../middlewares/validation');
const router = express.Router();

// Helper function to validate email format
function isValidEmail(email) {
    return validator.isEmail(email);
}


// Check if the email is already registered
router.post('/checkEmailExistence', async (req, res) => {
    const { email } = req.body;
    
    try {
        // Validate if email is provided
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Email is not valid!!' });
        }

        // Check if email exists in the database
        // console.log(email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered!!' });
        }
        
        // If no user exists with the email
        res.status(200).json({ valid: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
    });

    router.post('/checkUsernameExistence', async (req, res) => {
    const { username } = req.body;

    try {
        // Validate if email is provided
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Check if email exists in the database
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        // If no user exists with the email
        res.status(200).json({ valid: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
    });

// Register Route
router.post('/register', checkEmailExists, validatePassword, async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`Register endpoint: ${username}, ${email}, ${password}`);
    
    try {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

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
