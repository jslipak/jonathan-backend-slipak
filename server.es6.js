import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Routes from './routes';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import SocketIO from './services/socket.service';
import passport from './config/passport.config';
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const puerto = 8080;
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

app.use(
  require('express-session')({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 20000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//app.use(express.static('public'));
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
