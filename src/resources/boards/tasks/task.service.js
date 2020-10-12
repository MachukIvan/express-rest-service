const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getTaskById = id => tasksRepo.getTaskById(id);

const createNewTask = task => tasksRepo.addNewTask(task);

const updateTask = task => tasksRepo.updateTask(task);

const deleteTask = id => tasksRepo.deleteTask(id);

const unnassignUser = userId => tasksRepo.unnassignUser(userId);

module.exports = {
  getAll,
  getTaskById,
  createNewTask,
  updateTask,
  deleteTask,
  unnassignUser
};
