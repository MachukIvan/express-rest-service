const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const uuid = require('uuid');
const tasksService = require('../boards/tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const userId = req.params.id;
  const user = await usersService.getUserById(userId);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const newUser = new User({
    id: uuid(),
    name,
    login,
    password
  });
  await usersService.createNewUser(newUser);
  res.json(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
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
    res.sendStatus(401);
  }
});

router.route('/:id').delete(async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await usersService.deleteUser(userId);
  if (deletedUser) {
    await tasksService.unassignUser(userId);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
