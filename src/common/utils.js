const uuid = require('uuid');
const bcrypt = require('bcrypt');

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

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const checkHashedPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  catchErrors,
  assignReqId,
  hashPassword,
  checkHashedPassword
};
