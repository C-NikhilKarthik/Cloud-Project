const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(payload.id);
        next();
    } catch (error) {
        res.sendStatus(403);
    }
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(403);
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };
