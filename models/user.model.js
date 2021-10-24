const mongoose = require('mongoose');
const userCollection = 'User';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model(userCollection, UserSchema);
