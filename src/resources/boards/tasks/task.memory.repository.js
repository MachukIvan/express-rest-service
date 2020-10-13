let tasks = [];

const getAll = async boardId => {
  // TODO: mock implementation. should be replaced during task development
  return tasks.filter(task => task.boardId === boardId);
};

const getTaskById = async (boardId, taskId) => {
  return tasks.find(task => task.boardId === boardId && task.id === taskId);
};

const addNewTask = async task => {
  tasks.push(task);
};

const updateTask = async task => {
  const taskIndex = tasks.findIndex(
    t => t.id === task.id && t.boardId === task.boardId
  );
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

const deleteTask = async (boardId, taskId) => {
  let deletedTask = null;
  tasks.forEach((task, i) => {
    if (task.boardId === boardId && task.id === taskId) {
      deletedTask = task;
      tasks.splice(i, 1);
    }
  });
  return deletedTask;
};

const unassignUser = async userId => {
  tasks.forEach((task, i) => {
    if (task.userId === userId) {
      tasks[i].userId = null;
    }
  });
};

const deleteRelatedTasks = async boardId => {
  const deletedTasks = [];
  tasks = tasks.filter(task => {
    if (task.boardId === boardId) {
      deletedTasks.push(task);
      return false;
    }
    return true;
  });
  return Boolean(deletedTasks.length);
};

module.exports = {
  getAll,
  getTaskById,
  addNewTask,
  updateTask,
  deleteTask,
  unassignUser,
  deleteRelatedTasks
};
