const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.createCourse = async (req, res) => {
    // console.log(req.headers)
    try {
        const course = await Course.create({
            ...req.body,
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
