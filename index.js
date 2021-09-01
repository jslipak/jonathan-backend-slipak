const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const puerto = 8080;
const Routes = require('./routes');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const Productos = require('./services/product');
app.use(morgan('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));
app.use('/api', Routes);

app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'index',
  }),
);

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
});

app.set('views', './views/layouts');
app.set('view engine', 'hbs');
const server = http.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}`);
});

server.on('error', (err) => console.log(`Error en servidor ${err}`));
