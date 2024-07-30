// // routes/protectedRoutes.js
// import { Router } from 'express';
// import requireAuth from '../middleware/authMiddleware';
// const router = Router();

// // Example of a protected route
// router.get('/dashboard', requireAuth, (req, res) => {
//     res.status(200).json({ message: 'Access granted', user: req.user });
// });

// export default router;