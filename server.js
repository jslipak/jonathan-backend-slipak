const express = require('express');
//import express from 'express';
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const puerto = 8080;
const Routes = require('./routes');
//import Routes from './routes';
//import morgan from 'morgan';
const morgan = require('morgan');
const handlebars = require('express-handlebars');
//import handlebars from 'express-handlebars';
//import SocketIO from './services/socket.service';
const SocketIO = require('socket.io');

const { NODE_ENV } = process.env;
if (NODE_ENV === 'mongo') {
  const URL =
    'mongodb://root:example@127.0.0.1:27017/ecommerce?authSource=admin';
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => console.log('se ha conectado con mongo'))
    .catch((err) => console.log(err));
}
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

SocketIO(io);

app.set('views', './views/layouts');
app.set('view engine', 'hbs');
const server = http.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}`);
});

server.on('error', (err) => console.log(`Error en servidor ${err}`));
