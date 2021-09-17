const fs = require('fs');
//const msg = JSON.parse(fs.readFileSync('./messages.json', (encoding = 'utf8')));
const sqlMsg = require('../config/sqlite.config');
class Mensaje {
  async create(obj) {
    console.log(obj);
    sqlMsg.insert(obj, 'messages');
    console.log('se a agregado un nuevo mensaje:', obj);
  }
}

module.exports = new Mensaje();
