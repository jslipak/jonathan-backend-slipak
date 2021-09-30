const fs = require('fs');
const sqlMsg = require('../config/db.config');
class Mensaje {
  async create(obj) {
    sqlMsg.insert(obj, 'messages');
    console.log('se a agregado un nuevo mensaje:', obj);
  }
}

module.exports = new Mensaje();
