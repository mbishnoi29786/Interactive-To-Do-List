// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => 
    {
        try 
        {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully!' });
        } 
        catch (err) 
            {
                res.status(400).json({ error: 'Error registering user' });
            }
    });

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'manish');
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
