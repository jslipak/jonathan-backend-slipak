const { Router } = require('express');
const Producto = require('../services/product');
const route = Router();
const { NODE_ENV } = process.env;
const auth = require('../middleware/auth.middleware');

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
// tiene que estar antes para que no lo tome como ID
route.get('/filter', Producto.getFilter);
route.get('/:id', Producto.findOneById);
route.get('/random', Producto.random);
route.get('/visitas', Producto.visitas);
route.post('/', auth, Producto.create);
route.delete('/:id', auth, Producto.deleteOneById);
route.put('/:id', auth, Producto.updateOneById);

module.exports = route;
