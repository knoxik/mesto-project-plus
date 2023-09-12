import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateAvatar,
  updateProfile,
  getMe,
} from '../controllers/users';
import { validateUpdateProfile, validateAvatar, validateUserIdParam } from '../middlewares/validate';

const router = Router();

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', validateUserIdParam, getUser);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

export default router;
