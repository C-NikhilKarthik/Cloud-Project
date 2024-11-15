const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/details', authController.details);
router.post('/logout', authController.logout)

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

module.exports = router;