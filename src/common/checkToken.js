const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { catchErrors } = require('./utils');

const PATH_WHITE_LIST = ['/login', '/doc', '/'];

module.exports = catchErrors((req, res, next) => {
  if (PATH_WHITE_LIST.includes(req.path)) return next();
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer') {
      try {
        const verifiedToken = jwt.verify(token, JWT_SECRET_KEY);
        if (verifiedToken) {
          return next();
        }
      } catch (err) {
        res.status(401).send();
      }
    }
  }
  res.status(401).send();
});
