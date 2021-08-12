const express = require('express');
const app = express();
const puerto = 8080;
const Producto = require('./product');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.get('/', (_req, res) => {
//res.send('Hola Mundo');
//});

// Router
app.get('/api/productos/listar', Producto.show);
app.get('/api/productos/listar/:id', Producto.findOne);
app.get('/api/productos/random', Producto.random);
app.get('/api/productos/visitas', Producto.visitas);
app.post('/api/productos/guardar', Producto.create);

const server = app.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}`);
});

server.on('error', (err) => console.log(`Error en servidor ${err}`));
