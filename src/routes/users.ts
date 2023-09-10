import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
