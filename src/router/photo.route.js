import { Router } from 'express';
import photoController from 'controller/photo.controller';
import { auth } from 'middleware/auth';

const router = Router();

router.get('/newfeed', auth, photoController.getNewFeed);
router.get('/:id', auth, photoController.getOne);

export default router;
