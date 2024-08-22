// authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser ,logoutUser} = require('../controllers/authControllers');
const { verifyToken } = require('../middleware/authMiddleware');

// login route
router.post('/login', loginUser);

// logout route
router.post('/logout', logoutUser);

// signup route
// router.post('/signup', signupUser);

router.get('/check-auth', verifyToken, (req, res) => {
    res.status(200).send({ authenticated: true });
});

module.exports = router;
