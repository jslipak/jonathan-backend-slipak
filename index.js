const express = require('express');
const app = express();
const puerto = 8080;
const Routes = require('./routes');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', Routes);
app.set('view engine', 'ejs');
app.set('views', './views/layouts');

const server = app.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}`);
});

server.on('error', (err) => console.log(`Error en servidor ${err}`));
