const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [
      {
        id: 'string',
        title: 'string',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
