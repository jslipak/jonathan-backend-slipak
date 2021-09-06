"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var puerto = 8080;
//import * as Routes from './routes/index.js';
var Routes = require('./routes');
var morgan = require("morgan");
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', Routes);
var server = app.listen(puerto, function () {
    console.log("Servidor inicializado en el puerto " + puerto);
});
server.on('error', function (err) { return console.log("Error en servidor " + err); });
