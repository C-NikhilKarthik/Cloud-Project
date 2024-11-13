const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect, isInstructor, isAuthenticated } = require('../middleware/auth');

// router.use(protect); // Protect all routes

router
    .route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createCourse);

router
    .route('/:id')
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports = router;