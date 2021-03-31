import { Router } from 'express';
import userController from 'controller/user.controller';
import { auth } from 'middleware/auth';
const router = Router();

router.post('/',auth, userController.addComment);

export default router;
