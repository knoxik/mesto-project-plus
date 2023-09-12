import Router from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { login, createUser } from '../controllers/users';
import auth from '../middlewares/auth';
import { validateCreateUser, validateLogin } from '../middlewares/validate';
import { NOT_FOUND_CODE } from '../errors/constrants';

const router = Router();

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Роут не существует' });
});

export default router;
