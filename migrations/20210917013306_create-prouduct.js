exports.up = function (knex) {
  return knex.schema.createTable('products', (tbl) => {
    tbl.increments();
    tbl.text('title', 128).notNullable();
    tbl.text('price', 128).notNullable();
    tbl.text('thumbnail', 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
