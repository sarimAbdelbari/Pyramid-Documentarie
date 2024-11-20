// authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser , logoutUser ,checkAuth , demandeResetPassword, fetchDemands , replyToDemand, resetPassword} = require('../controllers/authControllers');
const { verifyToken } = require('../middleware/authMiddleware');

// login route
router.post('/login', loginUser);

// logout route
router.post('/logout', logoutUser);

// signup route
// router.post('/signup', signupUser);

router.get('/check-auth', verifyToken, checkAuth);
router.post('/demandeResetPassword', demandeResetPassword)
router.get('/fetchDemands',fetchDemands)
router.post('/replyToDemand',replyToDemand)
router.post('/resetPassword',resetPassword)
module.exports = router;
