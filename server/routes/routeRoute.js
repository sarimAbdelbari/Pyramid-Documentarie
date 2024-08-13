const express = require('express');
const router = express.Router();
const {
  createRoute,
  getRoutes,
  getRouteById,
  getRouteByParrentId,
  updateRouteById,
  deleteRouteById
} = require('../controllers/routeControler');

// Route CRUD endpoints
router.post('/', createRoute);
router.get('/', getRoutes);
router.get('/:id', getRouteById);
router.get('/parrentId/:parrentPath', getRouteByParrentId);
router.patch('/:id', updateRouteById);
router.delete('/:id', deleteRouteById);

module.exports = router;
