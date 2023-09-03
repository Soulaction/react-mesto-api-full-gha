const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const AuthError = require('../errors/auth-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не верный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (url) => /https?:\/\/(www.)?[-a-zA-Z0-9_~:/?#@!$&'()*,.+;=]+\.[-a-zA-Z0-9_~:/?#@!$&'()*,+;=]+#?/.test(url),
      message: 'Не верный формат url',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Не правильный логин, либо пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Не правильный логин, либо пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
