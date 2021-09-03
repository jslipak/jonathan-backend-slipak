const fs = require('fs');
const msg = JSON.parse(fs.readFileSync('./messages.json', (encoding = 'utf8')));

class Mensaje {
  async create(obj) {
    console.log(obj);
    msg.push(obj);
    await fs.promises.writeFile('./messages.json', JSON.stringify(msg));
    console.log('se a agregado un nuevo mensaje:', obj);
  }
}

module.exports = new Mensaje();
