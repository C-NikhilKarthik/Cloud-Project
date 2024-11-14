const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect, isInstructor, isAuthenticated } = require('../middleware/auth');

// router.use(protect); // Protect all routes

router
    .route('/')
    .post(isAuthenticated, courseController.createCourse);

router
    .route('/:id')
    .get(isAuthenticated, courseController.getCourse)
    .patch(isAuthenticated, courseController.updateCourse)
    .delete(isAuthenticated, courseController.deleteCourse);

module.exports = router;