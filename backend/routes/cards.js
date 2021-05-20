const express = require('express');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { joiCardId, joiCardData } = require('../middlewares/joi');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), joiCardData, createCard);
cardsRoutes.delete('/:cardId', joiCardId, deleteCard);
cardsRoutes.put('/:cardId/likes', joiCardId, likeCard);
cardsRoutes.delete('/:cardId/likes', joiCardId, dislikeCard);

exports.cardsRoutes = cardsRoutes;
