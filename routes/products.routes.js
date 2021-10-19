const { Router } = require('express');
const Producto = require('../services/product');
const route = Router();
const { NODE_ENV } = process.env;
const auth = require('../middleware/auth.middleware');
route.get('/edit/:id', auth, async (req, res) => {
  const id = req.params.id;
  let temp = await Producto.getDataId(id);
  if (NODE_ENV === 'mongo') {
    return res.render('edit', { layout: 'edit', edit: temp });
  } else {
    return res.render('edit', { layout: 'edit', edit: temp[0] });
  }
});
//route.get('/new', auth, (req, res) => {
//return res.render('new', { layout: 'new' });
//});
route.get('/filter', auth, Producto.getFilter);
route.get('/:id', auth, Producto.findOneById);
route.get('/random', auth, Producto.random);
route.get('/visitas', auth, Producto.visitas);
route.post('/', auth, Producto.create);
route.delete('/:id', auth, Producto.deleteOneById);
route.put('/:id', auth, Producto.updateOneById);
route.get('/', auth, Producto.getAll);
module.exports = route;
