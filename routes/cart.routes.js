const { Router } = require('express');
const Carrito = require('../services/cart.services');
const route = Router();
const auth = require('../middleware/auth.middleware');

route.get('/listar/:id', Carrito.findOneById); // Lista los productos de un id (Disponible Usuarios y administradores)
route.post('/:id/agregar/:id_producto', Carrito.addProductCart); // agregar un producto al carrito
route.delete('/:id/delete/id_producto', Carrito.deleteProductCart); // delete un producto al carrito

module.exports = route;
