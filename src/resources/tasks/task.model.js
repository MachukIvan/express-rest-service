const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    boardId: String,
    columnId: String,
    title: String,
    order: Number,
    description: String,
    userId: String
  },
  {
    collection: 'tasks',
    versionKey: false
  }
);

taskSchema.statics.toResponse = board => {
  const { _id, boardId, columnId, title, order, description, userId } = board;
  return { id: _id, boardId, columnId, title, order, description, userId };
};

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
