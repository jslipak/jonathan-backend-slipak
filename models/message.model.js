const mongoose = require('mongoose');

const messageCollection = 'Message';

const MessageSchema = new mongoose.Schema({
  user: { type: 'string', required: true, max: 128 },
  msg: { type: 'string', required: true, max: 128 },
  date: { type: 'string', required: true, max: 128 },
});

module.exports = mongoose.model(messageCollection, MessageSchema);
