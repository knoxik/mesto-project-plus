import { Request, Response } from 'express';
import Card from '../models/card';

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

export const getCards = async (req: Request, res: Response, next: any) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.send({ data: cards, success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (req: Request, res: Response, next: any) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findOneAndDelete({ _id: cardId });
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: any, res: Response, next: any) => {
  const { name, link } = req.body;

  try {
    const card = await (await Card.create({ name, link, owner: req.user._id })).populate('owner');
    if (!card) {
      throw new BadRequestError('Переданы некорректные данные при создании карточки.');
    }

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

export const likeCard = async (req: any, res: Response, next: any) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

export const dislikeCard = async (req: any, res: Response, next: any) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findOneAndUpdate(
      { _id: cardId },
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};
