const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const { catchErrors } = require('../../common/utils');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
      res.json(users.map(User.toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { name, login, password } = req.body;
      const newUser = {
        name,
        login,
        password
      };
      const createdUser = await usersService.createNewUser(newUser);
      if (createdUser) {
        res.json(User.toResponse(createdUser));
      } else {
        res.sendStatus(401);
      }
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const userId = req.params.id;
      const user = await usersService.getUserById(userId);
      if (user) {
        res.json(User.toResponse(user));
      } else {
        res.sendStatus(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const userId = req.params.id;
      const { name, login, password } = req.body;
      const updatedUser = await usersService.updateUser({
        id: userId,
        name,
        login,
        password
      });
      if (updatedUser) {
        res.json(User.toResponse(updatedUser));
      } else {
        res.sendStatus(404);
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const userId = req.params.id;
      const deletedUser = await usersService.deleteUser(userId);
      if (deletedUser) {
        await tasksService.unassignUser(userId);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
  );

module.exports = router;
