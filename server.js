'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _socket = require('./services/socket.service');

var _socket2 = _interopRequireDefault(_socket);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var puerto = 8080;

var advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'mongo') {
  var URL = 'mongodb://root:example@127.0.0.1:27017/ecommerce?authSource=admin';
  _mongoose2.default.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function (data) {
    return console.log('se ha conectado con mongo');
  }).catch(function (err) {
    return console.log(err);
  });
}

app.use((0, _expressSession2.default)({
  //store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sessiones' }),
  store: _connectMongo2.default.create({
    mongoUrl: 'mongodb+srv://user_jona:<password>@cluster0.a8xpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    mongoOptions: advancedOptions
  }),
  secret: 'Como te ven te tratan , si te ven mal te maltrata y si te ven bien te contrata',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 10 },
  rolling: true
}));
app.use((0, _cookieParser2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({
  extended: true
}));
app.use(_express2.default.static('public'));
app.use('/api', _routes2.default);

app.engine('hbs', (0, _expressHandlebars2.default)({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'index'
}));

(0, _socket2.default)(io);

app.set('views', './views/layouts');
app.set('view engine', 'hbs');
var server = http.listen(puerto, function () {
  console.log('Servidor inicializado en el puerto ' + server.address().port);
});

server.on('error', function (err) {
  return console.log('Error en servidor ' + err);
});
