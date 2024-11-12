const { isValidEmail, isPasswordValid } = require('../utils/validation-utils.js');
const User = require('../models/User');

// Check if the email is valid and doesn't exist
async function checkEmailExists(req, res, next) {
    const { email } = req.body;
    console.log("checkEmail: ",email);
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: 'Email already registered!!' });
    }
    next();
}

// Validate password format
async function validatePassword(req, res, next) {
    const { password, cpassword } = req.body;
    console.log("Password: ",password);
    
    if (!isPasswordValid(password)) {
        return res.status(400).json({ error: 'Password does not meet the criteria' });
    }
    if (password !== cpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    next();
}

module.exports = { checkEmailExists, validatePassword };
