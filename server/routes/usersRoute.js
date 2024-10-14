// routes/users.js
const express = require('express');
const router = express.Router();
const { createUser , updateUser , deleteUser , getUser , getUsers  } = require("../controllers/userControllers")



// Create a new user
router.post('/', createUser );

// Get all users
router.get('/', getUsers);

// router.patch('/updateMany', updateManyUsers);


// Get a user by ID
router.get('/:id', getUser);

// Update a user
router.patch('/:id',updateUser);

// Update Many Users

// Delete a user
router.delete('/:id',deleteUser);

module.exports = router;
