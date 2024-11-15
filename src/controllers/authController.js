const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const signToken = (id, name, email, avatar) => {
    return jwt.sign({ id, name, email, avatar }, JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await User.create({ email, password, name });
        const token = signToken(user._id);

        res.status(201).json({
            status: 'success',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password',
            });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.details = (req, res, next) => {
    try {
        // Extract token from Authorization header (Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        const token = authHeader.split(' ')[1];  // Get the token from "Bearer <token>"

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({
            status: 'success',
            data: decoded,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.logout = (req, res, next) => {
    try {

        // Clear the JWT cookie by setting it to expire immediately
        res.clearCookie('jwt');


        // Send a successful response
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (err) {
        // Send an error response if there's an issue
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};


exports.googleAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

// exports.googleCallback = (req, res) => {
//     passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
//         if (err) return res.status(400).json({ message: err.message });

//         const token = signToken(user._id, user.name, user.email, user.avatar);
//         res.cookie('jwt', token, {
//             httpOnly: true,           // Prevents JavaScript access
//             secure: true,
//             sameSite: 'None',
//             maxAge: 24 * 60 * 60 * 1000, // 24 hours
//             crossSite: true
//         });


//         // Redirect to frontend homepage
//         res.redirect(`${process.env.CLIENT_URL}/dashboard`);
//     })(req, res);
// };

exports.googleCallback = (req, res) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
        if (err) {
            return res.redirect(`/login?error=${encodeURIComponent(err.message)}`);
        }

        const token = signToken(user._id, user.name, user.email, user.avatar);

        // Redirect to the frontend with the token
        res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${encodeURIComponent(token)}`);
    })(req, res);
};



