import { Request, Response } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found-err';

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
    const user = await User.findOne({ _id: userId })
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: any) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: any, res: Response, next: any) => {
  const { name, about } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    ).orFail(new NotFoundError('Пользователь с указанным _id не найден.'));

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req: any, res: Response, next: any) => {
  const { avatar } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar },
      { new: true, runValidators: true },
    ).orFail(new NotFoundError('Пользователь с указанным _id не найден.'));

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};
