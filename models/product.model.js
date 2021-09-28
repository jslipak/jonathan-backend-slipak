const mongoose = require('mongoose');

const productCollection = 'Product';

const ProductSchema = new mongoose.Schema({
  title: { type: 'string', required: true, max: 128 },
  price: { type: 'string', required: true, max: 128 },
  thumbnail: { type: 'string', required: true, max: 128 },
});

module.exports = mongoose.model(productCollection, ProductSchema);
