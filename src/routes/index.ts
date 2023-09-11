import Router from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { NOT_FOUND_CODE } from '../errors/constrants';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Роут не существует' });
});

export default router;
