const knex = require('knex');
const { NODE_ENV } = process.env;
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
module.exports = { find, insert, findOne, deleteOne, updateOne };
