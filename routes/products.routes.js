const { Router } = require('express');
const Producto = require('../services/product');
const route = Router();
const { NODE_ENV } = process.env;
route.get('/new', (req, res) => {
  return res.render('new', { layout: 'new' });
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

route.get('/', Producto.getAll);
route.get('/filter', Producto.getFilter);
route.get('/:id', Producto.findOneById);
route.get('/random', Producto.random);
route.get('/visitas', Producto.visitas);
route.post('/', Producto.create);
route.delete('/:id', Producto.deleteOneById);
route.put('/:id', Producto.updateOneById);

module.exports = route;
