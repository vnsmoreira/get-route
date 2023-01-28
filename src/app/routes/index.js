const { Router } = require('express');
const distanceController = require('../controller');

const router = Router();

router.get('/', distanceController);
router.post('/', distanceController);

module.exports = router;
