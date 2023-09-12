import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateAvatar,
  updateProfile,
  getMe,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('me', getMe);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
