import { Router } from 'express';
import distanceController from '#controller';

const router = Router();

router.get('/', distanceController);
router.post('/', distanceController);

export default router;
