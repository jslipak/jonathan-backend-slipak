const { NODE_ENV } = process.env;
const { find, insert, findOne, deleteOne, updateOne, filter } =
  NODE_ENV == 'mongo' ? require('./mongo.config') : require('./knex.config');
module.exports = { find, insert, findOne, deleteOne, updateOne, filter };
