let boards = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return boards;
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const addNewBoard = async board => {
  boards.push(board);
};

const updateBoard = async board => {
  const boardIndex = boards.findIndex(b => b.id === board.id);
  if (boardIndex >= 0) {
    const updatedBoard = {
      ...boards[boardIndex],
      ...board
    };
    boards[boardIndex] = updatedBoard;
    return updatedBoard;
  }
  return undefined;
};

const deleteBoard = async id => {
  let deletedBoard = null;
  boards = boards.filter(board => {
    if (board.id === id) {
      deletedBoard = board;
      return false;
    }
    return true;
  });
  return deletedBoard;
};

module.exports = {
  getAll,
  getBoardById,
  addNewBoard,
  updateBoard,
  deleteBoard
};
