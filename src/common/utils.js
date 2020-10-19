const uuid = require('uuid');

const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const assignReqId = (req, res, next) => {
  req.id = uuid();
  next();
};

module.exports = {
  catchErrors,
  assignReqId
};
