const express = require('express');
const router = express.Router();
const {
  createRoute,
  getRoutes,
  getRouteById,
  getRouteByManyId,
  getRouteByParrentId,
  updateRouteById,
  getFeuilles,
  getFeuillesNot,
  deleteRouteById
} = require('../controllers/routeControler');

// Route CRUD endpoints
router.post('/', createRoute);
router.get('/', getRoutes);
router.get('/files', getFeuilles);
router.get('/pages', getFeuillesNot);
router.get('/:id', getRouteById);
router.post('/all', getRouteByManyId);
router.get('/parrentId/:parrentPath', getRouteByParrentId);
router.patch('/:id', updateRouteById);
router.delete('/:id', deleteRouteById);

module.exports = router;
