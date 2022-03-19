const getCluster = require('../../config/puppeteer');
const distanceController = require('../controllers/distanceController');
const { Router } = require('express');

const router = Router();

(async () => {
  const cluster = await getCluster();

  router.post('/', (req, res) => {
    distanceController.getDistance_POST(req, res, cluster);
  });

  router.get('/:addressA/:addressB', (req, res) => {
    distanceController.getDistance_GET(req, res, cluster);
  });
  
})();

module.exports = app => app.use('/distance', router);
