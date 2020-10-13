let users = [];

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
  let deletedUser = null;
  users = users.filter(user => {
    if (user.id === id) {
      deletedUser = user;
      return false;
    }
    return true;
  });
  return deletedUser;
};

module.exports = {
  getAll,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser
};
