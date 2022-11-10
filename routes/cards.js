const cardRouter = require('express').Router();
const {
  cardIdValid,
  createCardValid,
} = require('../middlewares/validation');
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', cardIdValid, deleteCardById);
cardRouter.post('/', createCardValid, createCard);
cardRouter.put('/:cardId/likes', cardIdValid, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValid, dislikeCard);

module.exports = cardRouter;
