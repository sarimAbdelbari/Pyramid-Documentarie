const express = require('express');
const router = express.Router();
const {
  createGroop,
  getAllGroops,
  getGroopById,
  getGroupsByManyIds,
  updateGroop,
  deleteGroop
} = require('../controllers/groopController');

// Groop CRUD endpoints
router.post('/', createGroop);
router.get('/', getAllGroops);
router.get('/:id', getGroopById);
router.post('/all', getGroupsByManyIds);
router.patch('/:id', updateGroop);
router.delete('/:id', deleteGroop);

module.exports = router;
