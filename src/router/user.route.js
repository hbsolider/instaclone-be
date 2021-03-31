import { Router } from 'express';
import userController from 'controller/user.controller';
import { auth } from 'middleware/auth';
const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/profile/:id', auth, userController.profile);
router.get('/profile', auth, userController.profile);

router.post('/follow', auth, userController.follow);
export default router;
