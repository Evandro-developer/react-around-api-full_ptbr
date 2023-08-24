import Card from '../models/card';
import formatCard from '../utils/formatCard';
import CardNotFoundError from '../errors/CardNotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';
import LikeError from '../errors/LikeError';
import DislikeError from '../errors/DislikeError';

export const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('likes', 'name about avatar _id')
    .populate('owner', 'name about avatar _id')
    .then((cards) => {
      const formattedCards = cards.map(formatCard);
      return res.json(formattedCards);
    })
    .catch(next);
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((savedCard) => Card.findById(savedCard._id).populate('owner', 'name about avatar _id'))
    .then((populatedCard) => {
      const formattedCard = formatCard(populatedCard);
      formattedCard.likes = [];
      res.json(formattedCard);
    })
    .catch(next);
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }

      if (card.owner.toString() !== userId) {
        throw new UnauthorizedError();
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new CardNotFoundError();
      }
      res.json({ message: 'Esta postagem foi excluída' });
    })
    .catch(next);
};

export const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }

      // Se o usuário já tiver dado like, lança o erro.
      if (card.likes.includes(userId)) {
        throw new LikeError();
      }

      // Se o usuário ainda não tiver dado like, adicione.
      card.likes.push(userId);
      return card.save();
    })
    .then((updatedCard) => {
      if (updatedCard) {
        return Card.findById(updatedCard._id)
          .populate('likes', 'name about avatar _id')
          .populate('owner', 'name about avatar _id');
      }
      return null;
    })
    .then((populatedCard) => {
      const formattedCard = formatCard(populatedCard);
      res.json(formattedCard);
    })
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }

      // Se o usuário tiver dado like, remova. Caso contrário, não faça nada.
      if (card.likes.includes(userId)) {
        card.likes.pull(userId);
        return card.save();
      }
      throw new DislikeError();
    })
    .then((updatedCard) => {
      if (updatedCard) {
        return Card.findById(updatedCard._id)
          .populate('likes', 'name about avatar _id')
          .populate('owner', 'name about avatar _id');
      }
      return null;
    })
    .then((populatedCard) => {
      const formattedCard = formatCard(populatedCard);
      res.json(formattedCard);
    })
    .catch(next);
};
