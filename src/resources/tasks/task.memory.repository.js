const tasks = [];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId) || [];
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
  return false;
};

const deleteTask = async (boardId, taskId) => {
  const taskIndex = tasks.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (taskIndex >= 0) {
    return tasks.splice(taskIndex, 1)[0];
  }
  return false;
};

const unassignUser = async userId => {
  tasks.forEach((task, i) => {
    if (task.userId === userId) {
      tasks[i].userId = null;
    }
  });
};

const deleteRelatedTasks = async boardId => {
  const relatedTasks = tasks.filter(task => task.boardId === boardId);
  if (relatedTasks.length) {
    relatedTasks.forEach(task => {
      const taskIndex = tasks.findIndex(t => t.id === task.id);
      tasks.splice(taskIndex, 1);
    });
  }
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
