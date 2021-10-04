exports.up = function (knex) {
  return knex.schema.alterTable('products', (tbl) => {
    tbl.bigInteger('stock').notNullable();
    tbl.text('codigo').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
