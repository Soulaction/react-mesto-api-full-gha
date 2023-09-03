const mongoose = require('mongoose');
const Cards = require('../modals/cards');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  Cards.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({
        data: {
          _id: card._id,
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
        },
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас недостаточно прав на удаление карточки');
      } else {
        Cards.findByIdAndRemove(cardId)
          .then((removeCard) => {
            res.status(200)
              .send({ data: removeCard });
          }).catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Некорректно переданный _id карточки'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Некорректно переданный _id карточки'));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Некорректно переданный _id карточки'));
        return;
      }
      next(err);
    });
};
