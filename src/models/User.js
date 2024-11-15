// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { required } = require('nconf');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            // Only require password for local authentication
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String, enum: ['student', 'teacher'],
        default: 'student',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

// Hash password before saving (only for local authentication)
userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);