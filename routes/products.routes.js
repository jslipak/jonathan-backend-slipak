const { Router } = require('express');
const Producto = require('../services/product');
const route = Router();

route.get('/', Producto.getAll);
route.get('/:id', Producto.findOneById);
route.get('/random', Producto.random);
route.get('/visitas', Producto.visitas);
route.post('/', Producto.create);
route.delete('/:id', Producto.deleteOneById);
route.put('/:id', Producto.updateOneById);

module.exports = route;
