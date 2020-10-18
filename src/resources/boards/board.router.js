const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const taskRouter = require('../tasks/task.router');
const { catchErrors } = require('../../common/utils');

router.use(
  '/:id/tasks/',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { title, columns } = req.body;
      const newBoard = new Board({
        title,
        columns
      });
      await boardsService.createNewBoard(newBoard);
      res.json(newBoard);
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const boardId = req.params.id;
      const board = await boardsService.getBoardById(boardId);
      if (board) {
        res.json(board);
      } else {
        res.sendStatus(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
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
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const boardId = req.params.id;
      const deletedBoard = await boardsService.deleteBoard(boardId);
      if (deletedBoard) {
        await tasksService.deleteRelatedTasks(boardId);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
  );

module.exports = router;
