const users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const addNewUser = async user => {
  users.push(user);
};

const updateUser = async user => {
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex >= 0) {
    if (users[userIndex].password === user.password) {
      const updatedUser = {
        ...users[userIndex],
        ...user
      };
      users[userIndex] = updatedUser;
      return updatedUser;
    }
    return undefined;
  }
  return undefined;
};

const deleteUser = async id => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex >= 0) {
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
  }
  return undefined;
};

module.exports = {
  getAll,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser
};
