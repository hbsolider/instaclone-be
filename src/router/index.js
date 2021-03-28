import { Router } from 'express';
import userRoute from './user.route';

const router = Router();

router.get('/', (req, res) => {
  res.send('test');
});

router.use('/user', userRoute);

export default router;
