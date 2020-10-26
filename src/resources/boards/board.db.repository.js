const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  return Board.find({});
};

const getBoardById = async id => {
  return Board.findById(id);
};

const addNewBoard = async board => {
  return Board.create(board);
};

const updateBoard = async board => {
  return Board.updateOne({ _id: board.id }, board, { new: true });
};

const deleteBoard = async id => {
  await Task.deleteMany({ boardId: id });
  return Board.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getBoardById,
  addNewBoard,
  updateBoard,
  deleteBoard
};
