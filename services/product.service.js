const db = require('../config/db.config');
const faker = require('faker/locale/es');
const { NODE_ENV } = process.env;
const normalizedMessages = require('../services/normalizr.service');
const util = require('util');

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

  async getAll(_req, res) {
    const msg = await db.find('messages');
    const temp = JSON.stringify(normalizedMessages(msg));
    const productos = await db.find('products');
    productos.map((v) => {
      if ('_id' in v) {
        v.id = v._id;
      }
      return { ...v };
    });
    res.render('index', { products: productos, temp });
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
    const response = await db.filter(field, value);
    res.json(response);
  }

  async getTest(req, res) {
    if (parseInt(req.query.cant) === 0) {
      res.json({ error: 'no hay producto' });
    } else {
      const cant = parseInt(req.query.cant) || 10;
      const response = [];
      for (let i = 0; i < cant; i++) {
        const title = faker.commerce.productName();
        const obj = {
          title,
          price: faker.commerce.price(),
          thumbnail: faker.image.imageUrl(),
          stock: faker.datatype.number(10, 50),
          codigo: `abc-${title}`,
        };
        response.push(obj);
      }
      res.json(response);
    }
  }
}

module.exports = new Producto();
