import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import NotFoundError from '../errors/not-found-err';
import UnauthorizedError from '../errors/unauthorized-err';
import BadRequestError from '../errors/bad-request-err';
import ConflictError from '../errors/conflict-err';

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
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.send({ data: user.toJSON() });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else if (err.code === 11000) {
      next(new ConflictError('Email уже используется другим пользователем'));
    } else {
      next(err);
    }
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
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
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
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

export const login = async (req: Request, res: Response, next: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password')
      .orFail(new UnauthorizedError('Неправильные почта или пароль'));

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');

    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' },
    );

    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).end();
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request | any, res: Response, next: any) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id)
      .orFail(new NotFoundError('Пользователь не найден.'));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};
