const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');
const boardsService = require('../boards/board.service');
const { catchErrors } = require('../../common/utils');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boardId = req.boardId;
      const tasks = await tasksService.getAll(boardId);
      res.json(tasks.map(Task.toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const boardId = req.boardId;
      const board = await boardsService.getBoardById(boardId);
      if (board) {
        const { columnId, title, order, description, userId } = req.body;
        const taskToCreate = {
          boardId,
          columnId,
          title,
          order,
          description,
          userId
        };
        const createdTask = await tasksService.createNewTask(taskToCreate);
        res.json(Task.toResponse(createdTask));
      } else {
        res.sendStatus(400);
      }
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const boardId = req.boardId;
      const taskId = req.params.id;
      const task = await tasksService.getTaskById(boardId, taskId);
      if (task) {
        res.json(Task.toResponse(task));
      } else {
        res.sendStatus(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const boardId = req.boardId;
      const taskId = req.params.id;
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
          res.json(Task.toResponse(updatedTask));
        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(400);
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const boardId = req.boardId;
      const taskId = req.params.id;
      const board = await boardsService.getBoardById(boardId);
      if (board) {
        const deletedTask = await tasksService.deleteTask(boardId, taskId);
        if (deletedTask) {
          res.json(Task.toResponse(deletedTask));
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    })
  );

module.exports = router;
