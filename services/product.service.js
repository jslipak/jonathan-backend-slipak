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
    if (NODE_ENV == 'mongo') {
      insertData.id = id;
    } else {
      insertData.id = id.id;
    }
    return insertData;
  }

  async getAll(req, res) {
    console.log(req);
    const msg = await db.find('messages');
    const productos = await db.find('products');
    productos.map((v) => {
      if ('_id' in v) {
        v.id = v._id;
      }
      return { ...v };
    });
    res.render('index', {
      products: productos,
      messages: msg?.reverse(),
      user: req.user.username,
    });
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

  async getFilter(req, res) {
    console.log('estoy aca en el puto gen Filter');
    let value;
    const field = req.query.field;
    if (field == 'title' || field == 'codigo') {
      value = req.query.value;
    } else {
      value = { from: parseInt(req.query.from), to: parseInt(req.query.to) };
    }
    console.log(value, 'aca en gen filter', field);
    const response = await db.filter(field, value);
    res.json(response);
  }

  random(req, res) {
    res.json(data[Math.floor(Math.random() * data.length)]);
    visitas.visitas.item = visitas.visitas.item + 1;
  }
  visitas(req, res) {
    res.json(visitas);
  }
}

module.exports = new Producto();
