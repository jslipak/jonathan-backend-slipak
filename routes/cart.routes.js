const { Router } = require('express');
const Carrito = require('../services/cart.services');
const route = Router();
const auth = require('../middleware/auth.middleware');

route.get('/', Carrito.getAll);
route.get('/:id', Carrito.findOneById);
route.post('/', Carrito.create); // crear orden
route.delete('/:id', auth, Carrito.deleteOneById); // delete un producto al carrito
route.post('/:id/product', auth, Carrito.insertProductById);

module.exports = route;
