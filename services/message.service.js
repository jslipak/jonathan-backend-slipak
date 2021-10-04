const fs = require('fs');
const sqlMsg = require('../config/db.config');
class Mensaje {
  async create(obj) {
    sqlMsg.insert(obj, 'messages');
  }
}

module.exports = new Mensaje();
