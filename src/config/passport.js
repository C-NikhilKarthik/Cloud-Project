// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://cloud-project-6vgv.onrender.com/auth/google/callback',
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://cloud-project-6vgv.onrender.com/auth/google/callback',
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists by email or googleId
                let user = await User.findOne({
                    $or: [
                        { googleId: profile.id },
                        { email: profile.emails[0].value }
                    ]
                });

                if (user) {
                    // If user exists but doesn't have googleId (registered via email)
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        if (profile.photos && profile.photos[0]) {
                            user.avatar = profile.photos[0].value;
                        }
                        await user.save();
                    }
                } else {
                    // Create new user if doesn't exist
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        avatar: profile.photos[0]?.value,
                    });
                }

                return done(null, user);
            } catch (error) {
                console.error('Google Auth Error:', error);
                return done(error, null);
            }
        }
    )
);

module.exports = passport;