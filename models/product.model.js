const mongoose = require('mongoose');

const productCollection = 'Product';

const ProductSchema = new mongoose.Schema({
  title: { type: 'string', required: true, max: 128 },
  codigo: { type: 'string', required: true, max: 128 },
  price: { type: 'string', required: true, max: 128 },
  thumbnail: { type: 'string', required: true, max: 128 },
  stock: { type: 'number', required: true, min: [0, 'Solo positivos'] },
});

module.exports = mongoose.model(productCollection, ProductSchema);
