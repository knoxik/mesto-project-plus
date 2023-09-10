import { Request, Response } from 'express';
import User from '../models/user';

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

export const getUsers = async (req: Request, res: Response, next: any) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: any) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: any) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    if (!user) {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя');
    }

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: any, res: Response, next: any) => {
  const { name, about } = req.body;
  try {
    if (!name || !about) {
      throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true },
    );

    if (!user) {
      throw NotFoundError('Пользователь с указанным _id не найден.');
    }

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req: any, res: Response, next: any) => {
  const { avatar } = req.body;

  try {
    if (!avatar) {
      throw new BadRequestError('Переданы некорректные данные при обновлении аватара.');
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar },
      { new: true },
    );
    if (!user) {
      throw NotFoundError('Пользователь с указанным _id не найден.');
    }

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};
