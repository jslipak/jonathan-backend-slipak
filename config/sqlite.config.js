const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

function find() {
  return db('messages').then((data) => data);
}

function insert(post) {
  return db('messages')
    .insert(post)
    .then((id) => ({ id: ids[0] }));
}

module.exports = { find, insert };
