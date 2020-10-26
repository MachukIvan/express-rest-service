const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  {
    collection: 'boards',
    versionKey: false
  }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

const Board = mongoose.model('boards', boardSchema);

module.exports = Board;
