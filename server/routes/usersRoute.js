// routes/users.js
const express = require('express');
const router = express.Router();
const User = require("../models/UserModel")
const { createUser , updateUser , deleteUser , getUser , getUsers} = require("../controllers/userControllers")



// Create a new user
router.post('/', createUser );

// Get all users
router.get('/', getUsers);

// Get a user by ID
router.get('/:id', getUser);

// Update a user
router.patch('/:id',updateUser);

// Delete a user
router.delete('/:id',deleteUser);

module.exports = router;


// // routes/users.js
// const express = require('express');
// const User = require('../models/UserModel');
// const router = express.Router();

// // Create a new user
// router.post('/', async (req, res) => {
//   const { uid, userName, email, password, permission } = req.body;
//   try {
//     const newUser = new User({ uid, userName, email, password, permission });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get all users

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get a user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user == null) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update a user
// router.patch('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user == null) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     Object.keys(req.body).forEach((key) => {
//       switch (key) {
//         case 'uid':
//           user.uid = req.body.uid;
//           break;
//         case 'userName':
//           user.userName = req.body.userName;
//           break;
//         case 'email':
//           user.email = req.body.email;
//           break;
//         case 'password':
//           user.password = req.body.password;
//           break;
//         case 'permission':
//           user.permission = req.body.permission;
//           break;
//         default:
//           break;
//       }
//     });

//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a user
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (user == null) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
