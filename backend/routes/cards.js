const cardsRouter = require('express')
  .Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www.)?[-a-zA-Z0-9_~:/?#@!$&'()*,.+;=]+\.[-a-zA-Z0-9_~:/?#@!$&'()*,+;=]+#?/),
  }),
}), createCard);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
