const express = require('express');
const router = express.Router();
const {
  createRoute,
  getRoutes,
  getRouteById,
  getRouteByManyId,
  getRouteByParrentId,
  updateRouteById,
  deleteRouteById,
  getFeuilles
} = require('../controllers/routeControler');

// Route CRUD endpoints
router.get('/getFeuilles',getFeuilles)
router.post('/', createRoute);
router.get('/', getRoutes);
router.get('/:id', getRouteById);
router.post('/all', getRouteByManyId);
router.get('/parrentId/:parrentPath', getRouteByParrentId);
router.patch('/:id', updateRouteById);
router.delete('/:id', deleteRouteById);

module.exports = router;
