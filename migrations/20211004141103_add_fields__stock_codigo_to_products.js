exports.up = function (knex) {
  return knex.schema.alterTable('products', (tbl) => {
    tbl.bigInteger('stock').notNullable();
    tbl.text('codigo', 128).notNullable();
  });
};

exports.down = function (knex) {};
