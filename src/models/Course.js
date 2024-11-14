const mongoose = require('mongoose');
const { required } = require('nconf');

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
    type: {
        type: String,
        enum: ['elective', 'theory'],
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);