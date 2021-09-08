'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _socket = require('./services/socket.service');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var puerto = 8080;

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
