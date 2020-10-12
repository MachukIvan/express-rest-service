const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const createNewBoard = board => boardsRepo.addNewBoard(board);

const updateBoard = board => boardsRepo.updateBoard(board);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoardById,
  createNewBoard,
  updateBoard,
  deleteBoard
};
