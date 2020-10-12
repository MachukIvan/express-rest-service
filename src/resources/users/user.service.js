const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const createNewUser = user => usersRepo.addNewUser(user);

const updateUser = user => usersRepo.updateUser(user);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createNewUser, updateUser, deleteUser };
