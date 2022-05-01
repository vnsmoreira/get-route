const { Router } = require('express');
const distanceController = require('../controllers/distance.controller');
const distanceMiddleware = require('../middlewares/distance.middleware');

const router = Router();

router.post('/', distanceMiddleware, distanceController.getDistance_POST);
router.get('/:addressA/:addressB', distanceMiddleware, distanceController.getDistance_GET);

module.exports = app => app.use('/distance', router);
