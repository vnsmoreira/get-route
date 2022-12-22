import { Router } from 'express';
import controller from '#controller';

const router = Router();

router.post('/', controller.getDistance_POST);
router.get('/:addressA/:addressB', controller.getDistance_GET);

export default router;
