const { Router } = require('express');
const Producto = require('../services/product.service');
const route = Router();
const { NODE_ENV } = process.env;

route.get('/test', (req, res) => {
  res.json({});
});
route.get('/edit/:id', async (req, res) => {
  const id = req.params.id;
  let temp = await Producto.getDataId(id);
  if (NODE_ENV === 'mongo') {
    return res.render('edit', { layout: 'edit', edit: temp });
  } else {
    return res.render('edit', { layout: 'edit', edit: temp[0] });
  }
});
route.get('/new', (req, res) => {
  return res.render('new', { layout: 'new' });
});

route.get('/filter', Producto.getFilter);
route.get('/:id', Producto.findOneById);
route.get('/random', Producto.random);
route.get('/visitas', Producto.visitas);
route.get('/', Producto.getAll);
route.post('/', Producto.create);
route.delete('/:id', Producto.deleteOneById);
route.put('/:id', Producto.updateOneById);

module.exports = route;
