import { Request, Response } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';
import BadRequestError from '../errors/bad-request-err';

export const getCards = async (req: Request, res: Response, next: any) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.send({ data: cards, success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (req: Request | any, res: Response, next: any) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId)
      .orFail(new NotFoundError('Карточка с указанным _id не найдена.'));

    if (card.owner.toString() !== req.user._id) throw new ForbiddenError('Недостаточно прав');
    await card.deleteOne();

    res.send({ data: card });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
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
      { new: true },
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
      { new: true },
    ).orFail(new NotFoundError('Передан несуществующий _id карточки.'));

    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};
