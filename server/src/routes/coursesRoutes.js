const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect, isInstructor, isAuthenticated } = require('../middleware/auth');

router
    .route('/')
    .get(courseController.getAllCourses)

module.exports = router;