const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { catchErrors } = require('./utils');

module.exports = catchErrors((req, res, next) => {
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
