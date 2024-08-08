const express = require('express');
const router = express.Router();
const {
  createRoute,
  getRoutes,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  deleteItemById
} = require('../controllers/routeControler');

// Route CRUD endpoints
router.post('/', createRoute);
router.get('/', getRoutes);
router.get('/:id', getRouteById);
router.patch('/:id', updateRouteById);
router.delete('/:id', deleteRouteById);
router.delete('/:routeId/data/:itemId', deleteItemById);

module.exports = router;
