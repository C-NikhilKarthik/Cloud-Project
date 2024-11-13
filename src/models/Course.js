const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    enrollStatus: {
        type: String,
        enum: ['open', 'ongoing', 'closed'],
        required: true
    },
    // instructor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);