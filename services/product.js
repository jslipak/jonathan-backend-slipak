let visitas = { visitas: { items: 0, item: 0 } };
const db = require('../config/db.config');
const { NODE_ENV } = process.env;

class Producto {
  async create(req, res) {
    const insertData = req.body;
    await db.insert(insertData, 'products');
    return res.redirect('/api/productos/new');
  }
  async createIO(obj) {
    const insertData = obj;
    const id = await db.insert(insertData, 'products');
    insertData.id = id;
    return insertData;
  }

  async getAll(_req, res) {
    visitas.visitas.items = visitas.visitas.items + 1;
    const msg = await db.find('messages');
    const productos = await db.find('products');
    productos.map((v) => {
      if ('_id' in v) {
        v.id = v._id;
      }
      return { ...v };
    });
    res.render('index', { products: productos, messages: msg?.reverse() });
  }

  async findOneById(req, res) {
    let id = req.params.id;
    let text = await db.findOne(id, 'products');
    return res.json(text ? text : { error: 'Producto no encontrado' });
  }
  async deleteOneById(req, res) {
    let id = req.params.id;
    await db.deleteOne(id, 'products');
    return res.json({ response: 'Producto Eliminado' });
  }

  async updateOneById(req, res) {
    let id = req.params.id;
    const obj = req.body;
    await db.updateOne(obj, id, 'products');
    return res.json({ producto: 'Producto Actualizado' });
  }
  async getDataId(id) {
    const product = await db.findOne(id, 'products');
    if ('_id' in product) {
      product.id = product._id;
    }
    return product;
  }
  random(_req, res) {
    res.json(data[Math.floor(Math.random() * data.length)]);
    visitas.visitas.item = visitas.visitas.item + 1;
  }
  visitas(_req, res) {
    res.json(visitas);
  }
}

module.exports = new Producto();
