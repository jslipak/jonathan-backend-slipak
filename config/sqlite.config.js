const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

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
