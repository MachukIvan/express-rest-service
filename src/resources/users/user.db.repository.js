const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getUserById = async id => {
  return User.findById(id);
};

const addNewUser = async user => {
  return User.create(user);
};

const updateUser = async user => {
  return User.updateOne({ _id: user.id }, user, { new: true });
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id });
};

const getUserByProps = async props => {
  return User.findOne(props);
};

module.exports = {
  getAll,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
  getUserByProps
};
