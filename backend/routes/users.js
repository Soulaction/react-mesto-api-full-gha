const {
  celebrate,
  Joi,
} = require('celebrate');
const usersRouter = require('express')
  .Router();

const {
  getUsers,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
  getUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', getUserInfo);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .length(24),
    }),
}), getUserById);
usersRouter.patch('/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
}), updateProfileUser);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .pattern(/https?:\/\/(www.)?[-a-zA-Z0-9_~:/?#@!$&'()*,.+;=]+\.[-a-zA-Z0-9_~:/?#@!$&'()*,+;=]+#?/),
    }),
}), updateAvatarUser);

module.exports = usersRouter;
