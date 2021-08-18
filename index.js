const express = require('express');
const app = express();
const puerto = 8080;
const Producto = require('./product');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Router
app.get('/api/productos/listar', Producto.getAll);
app.get('/api/productos/listar/:id', Producto.findOneById);
app.get('/api/productos/random', Producto.random);
app.get('/api/productos/visitas', Producto.visitas);
app.post('/api/productos/guardar', Producto.create);
app.delete('/api/producto/borrar/:id', Producto.deleteOneById);
app.put('/api/productos/actualizar/:id', Producto.updateOneById);

const server = app.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}`);
});

server.on('error', (err) => console.log(`Error en servidor ${err}`));
