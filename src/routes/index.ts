import Router from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { login, createUser } from '../controllers/users';
import auth from '../middlewares/auth';
import { NOT_FOUND_CODE } from '../errors/constrants';

const router = Router();

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', userRouter, auth);
router.use('/cards', cardRouter, auth);
router.use('', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Роут не существует' });
});

export default router;
