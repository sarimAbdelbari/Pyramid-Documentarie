// authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser , logoutUser ,checkAuth} = require('../controllers/authControllers');
const { verifyToken } = require('../middleware/authMiddleware');

// login route
router.post('/login', loginUser);

// logout route
router.post('/logout', logoutUser);

// signup route
// router.post('/signup', signupUser);

router.post('/check-auth', verifyToken, checkAuth);

module.exports = router;
