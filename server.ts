import * as express from 'express';
const app = express();
const puerto = 8080;
//import * as Routes from './routes/index.js';
const Routes = require('./routes')
import * as morgan from 'morgan';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', Routes);

const server = app.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${puerto}`);
});

server.on('error', (err: string ) => console.log(`Error en servidor ${err}`));
