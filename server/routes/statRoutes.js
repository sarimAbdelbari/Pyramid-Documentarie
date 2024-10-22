const express = require('express');
const router = express.Router();
const { getGeneralRouteStatistics,getGeneralUserStatistics , getNumOfSpecificView } = require('../controllers/statisticsController');
 
router.get('/user', getGeneralUserStatistics);
router.get('/route', getGeneralRouteStatistics);
router.get('/getNumberOfView',getNumOfSpecificView );

module.exports = router;