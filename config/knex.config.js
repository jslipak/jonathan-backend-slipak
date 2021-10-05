const { NODE_ENV } = process.env;
const knex = require('knex');
const config = require('../knexfile');
console.log(NODE_ENV);
const db = knex(config[NODE_ENV]);

function find(table) {
  return db(table).then((data) => data);
}

function insert(post, table) {
  return db(table)
    .insert(post)
    .then((id) => ({ id: id[0] }));
}

function findOne(id, table) {
  return db(table).where({ id: id });
}

function deleteOne(id, table) {
  return db(table).where({ id: id }).del();
}

function updateOne(obj, id, table) {
  return db(table).where({ id: id }).update(obj);
}
function filter(field = '', value) {
  if (!['title', 'codigo', 'price', 'stock'].includes(field)) {
    return { Error: 'No existe ese campo' };
  }
  // value could be a string or to range a object {from, to}
  if (field == 'title' || field == 'codigo') {
    return db('products').where({ [field]: value }); //products.where(field).equals(value);
  } else if (field == 'price' || field == 'stock') {
    return db('products').whereBetween(field, [value.from, value.to]);
  }
}

module.exports = { find, insert, findOne, deleteOne, updateOne, filter };
