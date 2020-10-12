const tasks = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return tasks;
};

const getTaskById = async id => {
  return tasks.find(task => task.id === id);
};

const addNewTask = async task => {
  tasks.push(task);
};

const updateTask = async task => {
  const taskIndex = tasks.findIndex(b => b.id === task.id);
  if (taskIndex >= 0) {
    const updatedTask = {
      ...tasks[taskIndex],
      ...task
    };
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  }
  return undefined;
};

const deleteTask = async id => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex >= 0) {
    const deletedTask = tasks.splice(taskIndex, 1);
    return deletedTask[0];
  }
  return undefined;
};

module.exports = {
  getAll,
  getTaskById,
  addNewTask,
  updateTask,
  deleteTask
};
