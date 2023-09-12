import { Request, Response, NextFunction } from 'express';
import { SERVER_ERROR_CODE } from '../errors/constrants';

type TErr = {
  statusCode?: number,
  message?: string,
  code?: number,
}

export default (err: TErr, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};
