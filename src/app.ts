import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import { SERVER_ERROR_CODE, BAD_REQUEST_CODE } from './errors/constrants';

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

type TErr = {
  statusCode?: number,
  message?: string
}

app.use((err: TErr, req: Request, res: Response, next: NextFunction) => {
  let { statusCode = SERVER_ERROR_CODE } = err;
  const { message } = err;

  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    statusCode = BAD_REQUEST_CODE;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT);
