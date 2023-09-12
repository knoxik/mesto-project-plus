import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-err';

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    jwt.verify(token, 'some-secret-key', (err: any, payload: any) => {
      if (err) throw new UnauthorizedError('Неверный токен');
      (req as any).user = payload;
    });
    next();
  } catch (err) {
    next(err);
  }
};
