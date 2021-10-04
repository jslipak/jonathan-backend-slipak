const mongoose = require('mongoose');

const productCollection = 'Product';

const ProductSchema = new mongoose.Schema({
  title: { type: 'String', required: true, max: 128 },
  price: { type: 'String', required: true, max: 128 },
  thumbnail: { type: 'String', required: true, max: 128 },
  codigo: { type: 'String', required: true, max: 128 },
  stock: { type: 'Number', required: true },
});

module.exports = mongoose.model(productCollection, ProductSchema);
