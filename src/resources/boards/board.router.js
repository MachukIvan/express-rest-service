const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const uuid = require('uuid');
const Task = require('./tasks/task.model');
const tasksService = require('./tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const boardId = req.params.id;
  const board = await boardsService.getBoardById(boardId);
  if (board) {
    res.json(board);
  } else {
    res.sendStatus(404);
  }
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
    await tasksService.deleteRelatedTasks(boardId);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.route('/:id/tasks/').get(async (req, res) => {
  const boardId = req.params.id;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:id/tasks/:taskId').get(async (req, res) => {
  const boardId = req.params.id;
  const taskId = req.params.taskId;
  const task = await tasksService.getTaskById(boardId, taskId);
  res.json(task);
});

router.route('/:id/tasks/').post(async (req, res) => {
  const boardId = req.params.id;
  const board = await boardsService.getBoardById(boardId);
  if (board) {
    const { columnId, title, order, description, userId } = req.body;
    const newTask = new Task({
      id: uuid(),
      boardId,
      columnId,
      title,
      order,
      description,
      userId
    });
    await tasksService.createNewTask(newTask);
    res.json(newTask);
  } else {
    res.sendStatus(400);
  }
});

router.route('/:id/tasks/:taskId').put(async (req, res) => {
  const boardId = req.params.id;
  const taskId = req.params.taskId;
  const board = await boardsService.getBoardById(boardId);
  if (board) {
    const { title, order, description, userId } = req.body;
    const updatedTask = await tasksService.updateTask({
      id: taskId,
      boardId,
      title,
      order,
      description,
      userId
    });
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.route('/:id/tasks/:taskId').delete(async (req, res) => {
  const boardId = req.params.id;
  const taskId = req.params.taskId;
  const board = await boardsService.getBoardById(boardId);
  if (board) {
    const deletedTask = await tasksService.deleteTask(boardId, taskId);
    if (deletedTask) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
