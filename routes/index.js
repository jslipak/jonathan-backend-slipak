const { Router } = require('express');
const route = Router();
const productRouter = require('./products.routes');
const cartRouter = require('./cart.routes');

route.use('/productos', productRouter);
route.use('/carritos', cartRouter);

module.exports = route;
