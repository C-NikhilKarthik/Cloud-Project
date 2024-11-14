const Course = require('../models/Course');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

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
        const course = await Course.findOne(
            { _id: course_id }
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
}

exports.createCourse = async (req, res) => {
    // console.log(req.headers)
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        // Verify and decode JWT token to get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is an instructor
        // if (decoded.role !== 'instructor') {
        //     return res.status(403).json({
        //         status: 'fail',
        //         message: 'Only instructors can access this resource',
        //     });
        // }

        const course = await Course.create({
            ...req.body,
            instructor: decoded.id
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
        // Get JWT token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication required',
            });
        }

        // Verify and decode JWT token to get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is an instructor
        // if (decoded.role !== 'instructor') {
        //     return res.status(403).json({
        //         status: 'fail',
        //         message: 'Only instructors can access this resource',
        //     });
        // }

        // Find courses where professorId matches the decoded user ID
        const courses = await Course.find({ instructor: decoded.id });

        // Respond with the filtered courses
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
    // const id = req.user.id

    try {
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
