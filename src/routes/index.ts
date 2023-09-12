import Router from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { login, createUser } from '../controllers/users';
import auth from '../middlewares/auth';
import { validateCreateUser, validateLogin } from '../middlewares/validate';
import NotFoundError from '../errors/not-found-err';

const router = Router();

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('', () => {
  throw new NotFoundError('Страница не найдена');
});

export default router;
