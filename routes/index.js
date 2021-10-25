const { Router } = require('express');
const route = Router();
const productRouter = require('./products.routes');
const sessionRouter = require('./session.routes');
const cookieRouter = require('./cookies.routes');
route.use('/sessions', sessionRouter);
route.use('/productos', productRouter);
route.use('/cookies', cookieRouter);

module.exports = route;
