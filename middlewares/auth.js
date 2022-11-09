const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie || !cookie.startsWith('jwt=')) {
    next(new AuthError('Необходима авторизация'));
  } else {
    const token = req.cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new AuthError('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};

module.exports = auth;
