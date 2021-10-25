const { Router } = require('express');
const route = Router();
const auth = require('../middleware/auth.middleware');

const productRouter = require('./products.routes');
const sessionRouter = require('./session.routes');
const cookieRouter = require('./cookies.routes');
route.use('/sessions', sessionRouter);
route.use('/productos', auth, productRouter);
route.use('/cookies', cookieRouter);

module.exports = route;
