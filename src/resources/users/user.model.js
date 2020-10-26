const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  {
    collection: 'users',
    versionKey: false
  }
);

userSchema.statics.toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

const User = mongoose.model('users', userSchema);

module.exports = User;
