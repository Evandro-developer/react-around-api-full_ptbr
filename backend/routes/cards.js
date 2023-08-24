import express from 'express';
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  validateAuthorizationHeader,
  validateCardCreation,
  validateCardId,
} from '../utils/validations';

const router = express.Router();

// Middleware de validação do cabeçalho de autorização em todas as rotas.
router.use(validateAuthorizationHeader);

router.get('/', getAllCards);
router.post('/', validateCardCreation, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/likes/:cardId', validateCardId, likeCard);
router.delete('/likes/:cardId', validateCardId, dislikeCard);

export default router;
