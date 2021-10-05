const mongoose = require('mongoose');
const products = require('../models/product.model');
const messages = require('../models/message.model');

const selectCollection = async (str, fn) => {
  if (str === 'messages') {
    data = await fn(messages);
    return data;
  } else if (str === 'products') {
    data = await fn(products);
    return data;
  }
};

function find(table) {
  const sendFind = (obj) => {
    return obj
      .find()
      .lean()
      .then((data) => {
        return data;
      });
  };
  return selectCollection(table, sendFind);
}

function insert(post, table) {
  const sendInsert = (obj) => obj.create(post).then((data) => data._id);
  return selectCollection(table, sendInsert);
}

function findOne(id, table) {
  const sendFind = (obj) => {
    return obj
      .findById(id)
      .lean()
      .then((data) => {
        return data;
      });
  };
  return selectCollection(table, sendFind);
}

function updateOne(obj, id, table) {
  var newId = new mongoose.mongo.ObjectId(id);
  return products.findByIdAndUpdate(newId, obj);
}
function deleteOne(id, table) {
  var newId = new mongoose.mongo.ObjectId(id);
  return products.findByIdAndDelete(newId);
}
function filter(field = '', value) {
  if (!['title', 'codigo', 'price', 'stock'].includes(field)) {
    return { Error: 'No existe ese campo' };
  }
  // value could be a string or to range a object {from, to}
  if (field == 'title' || field == 'codigo') {
    return products.where(field).equals(value);
  } else if (field == 'price' || field == 'stock') {
    return products.find({ [field]: { $gte: value.from, $lt: value.to } });
  }
}

module.exports = { find, insert, findOne, deleteOne, updateOne, filter };
