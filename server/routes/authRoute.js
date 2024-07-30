const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware');


// controller functions
const { loginUser} = require('../controllers/authControllers')
const router = express.Router()

// login route
router.post('/login',loginUser)

// signup route
// router.post('/signup', signupUser)

router.get('/check-auth', verifyToken, (req, res) => {
    res.status(200).send({ authenticated: true });
});

module.exports = router;
