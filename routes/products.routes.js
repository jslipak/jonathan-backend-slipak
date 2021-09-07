const { Router } = require('express');
const Producto = require('../services/product.services');
const route = Router();
const auth = require('../middleware/auth.middleware');

route.get('/', Producto.getAll);
route.get('/:id', Producto.findOneById);
route.get('/random', Producto.random);
route.get('/visitas', Producto.visitas);
route.post('/', auth, Producto.create);
route.delete('/:id', auth, Producto.deleteOneById);
route.put('/:id', auth, Producto.updateOneById);

module.exports = route;
