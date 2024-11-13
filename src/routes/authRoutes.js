const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// router.get('/google',
//     passport.authenticate('google', {
//         scope: ['profile', 'email'],
//         accessType: 'offline',
//         prompt: 'consent'
//     })
// );

// // Google OAuth callback
// router.get('/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login', session: false }),
//     (req, res) => {
//         try {
//             const token = signToken(req.user._id);

//             // For web applications
//             res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);

//             // Alternative: For API responses
//             // res.status(200).json({
//             //   status: 'success',
//             //   token,
//             //   user: req.user
//             // });
//         } catch (error) {
//             res.redirect(`${process.env.CLIENT_URL}/login?error=Authentication failed`);
//         }
//     }
// );

// OAuth routes
// router.get('/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         const token = authController.signToken(req.user._id);
//         res.redirect(`/oauth-success?token=${token}`);
//     }
// );

module.exports = router;