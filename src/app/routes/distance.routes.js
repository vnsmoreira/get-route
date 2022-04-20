const distanceController = require('../controllers/distance.controller');
const { Router } = require('express');

const router = Router();

router.post('/', distanceController.getDistance_POST);

router.get('/:addressA/:addressB', distanceController.getDistance_GET);

module.exports = app => app.use('/distance', router);
