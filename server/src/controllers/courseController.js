const Course = require('../models/Course');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.getCourse = async (req, res) => {
    const course_id = req.params.id;

    // Check if course_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid course ID format',
        });
    }

    try {
        const course = await Course.findOne({ _id: course_id });

        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: course,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.registerCourse = async (req, res) => {
    const course_id = req.params.id;

    // Check if course_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid course ID format',
        });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'fail',
            message: 'Authentication required',
        });
    }

    const token = authHeader.split(' ')[1]; // Get the token from "Bearer <token>"

    // Verify and decode JWT token to get user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const course = await Course.findById(course_id);

        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found',
            });
        }

        // Check if the user is already registered for the course
        if (course.studentIds.includes(decoded.id)) {
            return res.status(400).json({
                status: 'fail',
                message: 'You are already registered for this course',
            });
        }

        // Add the user's ID to the course's studentIds array
        course.studentIds.push(decoded.id);
        await course.save();

        res.status(200).json({
            status: 'success',
            data: course,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        const token = authHeader.split(' ')[1]; // Get the token from "Bearer <token>"

        // Verify and decode JWT token to get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Create the course
        const course = await Course.create({
            ...req.body,
            instructor: decoded.id,
            instructorName: decoded.name
        });

        res.status(201).json({
            status: 'success',
            data: course,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        // Find courses where instructor matches the decoded user ID
        const courses = await Course.find();

        res.status(200).json({
            status: 'success',
            results: courses.length,
            data: courses,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getYourCourses = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        const token = authHeader.split(' ')[1]; // Get the token from "Bearer <token>"

        // Verify and decode JWT token to get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find courses where instructor matches the decoded user ID
        const courses = await Course.find({ instructor: decoded.id });

        res.status(200).json({
            status: 'success',
            results: courses.length,
            data: courses,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.updateCourse = async (req, res) => {
    const course_id = req.params.id;

    // Check if course_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid course ID format',
        });
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        const token = authHeader.split(' ')[1]; // Get the token from "Bearer <token>"

        // Verify and decode JWT token to get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Update the course
        const course = await Course.findOneAndUpdate(
            { _id: course_id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: course,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        const token = authHeader.split(' ')[1]; // Get the token from "Bearer <token>"

        // Verify and decode JWT token to get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Delete the course
        const course = await Course.findOneAndDelete({
            _id: req.params.id,
        });

        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Course deleted successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
