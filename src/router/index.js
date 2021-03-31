import { Router } from 'express';
import userRoute from './user.route';
import photoRoute from './photo.route';
import commentRoute from './comment.route';
const router = Router();

router.use('/photo', photoRoute);
router.use('/comment', commentRoute);
router.use('/user', userRoute);

export default router;
