const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust according to your user model path

// Middleware to ensure user is authenticated
const isAuthenticated = async (req, res, next) => {
    // Extract token from Authorization header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];  // Get the token from "Bearer <token>"

    // Verify JWT token and get the user
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET); // Make sure your JWT_SECRET is set
        req.user = decoded;  // Assuming the JWT contains user data, e.g., { _id: userId, role: 'instructor' }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to check if user is authorized (e.g., checking if user matches resource ID)
const isAuthorized = (req, res, next) => {
    if (req.user && req.user._id.toString() === req.params.id) {
        return next();
    }
    return res.status(403).json({ message: 'Not authorized' });
};

// Middleware to check if user is an instructor
const isInstructor = (req, res, next) => {
    if (req.user && req.user.role === 'instructor') {
        return next();
    }
    return res.status(403).json({ message: 'Instructor access required' });
};

module.exports = {
    isAuthenticated,
    isAuthorized,
    isInstructor
};
