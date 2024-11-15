const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect, isInstructor, isAuthenticated, isStudent } = require('../middleware/auth');

router
    .route('/')
    .get(isAuthenticated, isInstructor, courseController.getYourCourses)
    .post(isAuthenticated, isInstructor, courseController.createCourse)

router
    .route('/:id')
    .get(isAuthenticated, courseController.getCourse)
    .patch(isAuthenticated, isInstructor, courseController.updateCourse)
    .delete(isAuthenticated, isInstructor, courseController.deleteCourse)

router
    .route('/:id/register')
    .get(isAuthenticated, isStudent, courseController.registerCourse) // New route for registering a course

module.exports = router;