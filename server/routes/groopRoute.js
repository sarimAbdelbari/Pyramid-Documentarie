const express = require('express');
const router = express.Router();
const {
  createGroop,
  getGroops,
  getGroopById,
  updateGroopById,
  deleteGroopById
} = require('../controllers/groopController');

// Groop CRUD endpoints
router.post('/', createGroop);
router.get('/', getGroops);
router.get('/:id', getGroopById);
router.patch('/:id', updateGroopById);
router.delete('/:id', deleteGroopById);

module.exports = router;
