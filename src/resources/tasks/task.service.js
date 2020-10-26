const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getTaskById = (boardId, taskId) => tasksRepo.getTaskById(boardId, taskId);

const createNewTask = task => tasksRepo.addNewTask(task);

const updateTask = (boardId, taskId) => tasksRepo.updateTask(boardId, taskId);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const unassignUser = userId => tasksRepo.unassignUser(userId);

const deleteRelatedTasks = boardId => tasksRepo.deleteRelatedTasks(boardId);

module.exports = {
  getAll,
  getTaskById,
  createNewTask,
  updateTask,
  deleteTask,
  unassignUser,
  deleteRelatedTasks
};
