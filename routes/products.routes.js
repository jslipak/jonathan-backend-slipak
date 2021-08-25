const { Router } = require('express');
const Producto = require('../services/product');
const route = Router();

route.get('/new', (req, res) => {
  return res.render('new', { layout: 'new' });
});

route.get('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const temp = await Producto.getDataId(id);
  console.log('porque underfined:', temp);
  return res.render('edit', { layout: 'edit', edit: temp });
});

route.get('/', Producto.getAll);
route.get('/:id', Producto.findOneById);
route.get('/random', Producto.random);
route.get('/visitas', Producto.visitas);
route.post('/', Producto.create);
route.delete('/:id', Producto.deleteOneById);
route.put('/:id', Producto.updateOneById);

module.exports = route;
