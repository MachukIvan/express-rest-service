const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getTaskById = async (boardId, taskId) => {
  return Task.findOne({ _id: taskId, boardId });
};

const addNewTask = async task => {
  return Task.create(task);
};

const updateTask = async task => {
  return Task.updateOne({ _id: task.id }, task, { new: true });
};

const deleteTask = async (boardId, taskId) => {
  return Task.deleteOne({ _id: taskId });
};

const unassignUser = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

const deleteRelatedTasks = async boardId => {
  return Task.deleteMany({ boardId });
};

module.exports = {
  getAll,
  getTaskById,
  addNewTask,
  updateTask,
  deleteTask,
  unassignUser,
  deleteRelatedTasks
};
