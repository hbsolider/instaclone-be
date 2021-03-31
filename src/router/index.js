import { Router } from 'express';
import userRoute from './user.route';
import photoRoute from './photo.route';
import commentRoute from './comment.route';
const router = Router();

router.get('/', (req, res) => {
  res.send('test');
});

router.use('/user', userRoute);
router.use('/photo', photoRoute);
router.use('/comment', commentRoute);

export default router;
