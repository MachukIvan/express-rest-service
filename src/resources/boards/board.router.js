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

router.route('/:id/tasks/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const taskId = req.params.taskId;
  const task = await tasksService.getTaskById(taskId);
  res.json(task);
});

router.route('/:id/tasks/').post(async (req, res) => {
  const boardId = req.params.id;
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
});

router.route('/:id/tasks/:taskId').put(async (req, res) => {
  const taskId = req.params.taskId;
  const { title, order, description, userId } = req.body;
  const updatedTask = await tasksService.updateTask({
    id: taskId,
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
});

router.route('/:id/tasks/:taskId').delete(async (req, res) => {
  const taskId = req.params.taskId;
  const deletedTask = await tasksService.deleteTask(taskId);
  if (deletedTask) {
    res.json(deletedTask);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
