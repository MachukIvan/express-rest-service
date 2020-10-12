const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const uuid = require('uuid');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const boardId = req.params.id;
  const board = await boardsService.getBoardById(boardId);
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board({
    id: uuid(),
    title,
    columns
  });
  await boardsService.createNewBoard(newBoard);
  res.json(newBoard);
});

router.route('/:id').put(async (req, res) => {
  const boardId = req.params.id;
  const { title, columns } = req.body;
  const updatedBoard = await boardsService.updateBoard({
    id: boardId,
    title,
    columns
  });
  if (updatedBoard) {
    res.json(updatedBoard);
  } else {
    res.sendStatus(400);
  }
});

router.route('/:id').delete(async (req, res) => {
  const boardId = req.params.id;
  const deletedBoard = await boardsService.deleteBoard(boardId);
  if (deletedBoard) {
    res.json(deletedBoard);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
