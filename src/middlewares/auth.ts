import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-err';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const token = (authorization as string).replace('Bearer ', '');
    jwt.verify(token, 'some-secret-key', (err, payload) => {
      if (err) throw new UnauthorizedError('Неверный токен');
      (req as any).user = payload;
    });
    next();
  } catch (err) {
    next(err);
  }
};
