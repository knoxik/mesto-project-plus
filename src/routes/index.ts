import Router from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { login, createUser } from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', userRouter, auth);
router.use('/cards', cardRouter, auth);
router.use('', (req, res) => {
  res.status(404).send({ message: 'Роут не существует' });
});

export default router;
