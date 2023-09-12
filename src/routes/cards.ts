import { Router } from 'express';
import {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { validateCardIdParam, validateCreateCard } from '../middlewares/validate';

const router = Router();

router.get('/', getCards);
router.delete('/:cardId', validateCardIdParam, deleteCard);
router.post('/', validateCreateCard, createCard);
router.put('/:cardId/likes', validateCardIdParam, likeCard);
router.delete('/:cardId/likes', validateCardIdParam, dislikeCard);

export default router;
