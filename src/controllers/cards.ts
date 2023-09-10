import { Request, Response } from 'express';
import Card from '../models/card';

const NotFoundError = require('../errors/not-found-err');

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
    const card = await Card.findOneAndDelete({ _id: cardId })
      .orFail(new NotFoundError('Карточка с указанным _id не найдена.'));

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: any, res: Response, next: any) => {
  const { name, link } = req.body;

  try {
    const card = await (await Card.create({ name, link, owner: req.user._id })).populate('owner');
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
      { new: true, runValidators: true },
    ).orFail(new NotFoundError('Передан несуществующий _id карточки.'));

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
      { new: true, runValidators: true },
    ).orFail(new NotFoundError('Передан несуществующий _id карточки.'));

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};
