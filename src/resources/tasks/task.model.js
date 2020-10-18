const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    boardId = 'string',
    columnId = 'string',
    title = 'string',
    order = 0,
    description = 'string',
    userId = 'string'
  } = {}) {
    this.id = id;
    this.boardId = boardId;
    this.columnId = columnId;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
  }
}

module.exports = Task;
