import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import ErrorHandler from './middlewares/error-handler';

const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);

app.listen(PORT);
