const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new AuthError('Необходима авторизация'));
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
