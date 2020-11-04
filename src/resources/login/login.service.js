const userRepo = require('../users/user.db.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkHashedPassword } = require('../../common/utils');

const signToken = async (userLogin, password) => {
  const user = await userRepo.getUserByProps({ login: userLogin });
  if (!user) {
    return undefined;
  }
  const { password: hashedPassword } = user;

  const passwordsMatch = await checkHashedPassword(password, hashedPassword);
  if (passwordsMatch) {
    const { id, login } = user;
    const token = jwt.sign({ userId: id, login }, JWT_SECRET_KEY);
    return token;
  }
  return undefined;
};

module.exports = {
  signToken
};
