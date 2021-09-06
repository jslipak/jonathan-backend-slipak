const { Router } = require('express');
const route = Router();
const productRouter = require('./products.routes');

route.use('/productos', productRouter);

module.exports = route;
//export default route;
