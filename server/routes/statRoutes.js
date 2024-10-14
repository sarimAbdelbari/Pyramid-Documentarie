const express = require('express');
const router = express.Router();
const { getGeneralStatistics , getNumOfSpecificView } = require('../controllers/statisticsController');
 
router.get('/', getGeneralStatistics );
router.get('/getNumberOfView',getNumOfSpecificView );

module.exports = router;