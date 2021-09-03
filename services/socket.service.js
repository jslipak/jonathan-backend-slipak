const Productos = require('./product');
const messages = require('./message.service');

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('producto', async (arg) => {
      const element = await Productos.createIO(arg);
      io.emit('producto', element);
    });
    socket.on('deleteProduct', (arg) => {
      io.emit('deleteProduct', arg);
    });
    socket.on('updateProduct', (obj) => {
      console.log('line 40 index.js:', obj);
      io.emit('updateProduct', obj);
    });
    socket.on('msg', (obj) => {
      obj.date = new Date();
      messages.create(obj);
      io.emit('msg', obj);
    });
  });
};
