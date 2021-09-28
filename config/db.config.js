const { NODE_ENV } = process.env;

if (NODE_ENV != 'mongo') {
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
} else {
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
          //console.log(data);
          return data;
        });
    };
    return selectCollection(table, sendFind);
  }

  function insert(post, table) {
    console.log(table, 'aca estoy', post);
    const sendInsert = (obj) => obj.create(post).then((data) => data._id);
    return selectCollection(table, sendInsert);
  }

  function findOne(id, table) {
    const sendFind = (obj) => obj.findById(id).lean();
    return selectCollection(table, sendFind);
  }

  function deleteOne(id, table) {
    console.log('hola');
  }

  function updateOne(obj, id, table) {
    console.log('hola');
  }
}
module.exports = { find, insert, findOne, deleteOne, updateOne };
