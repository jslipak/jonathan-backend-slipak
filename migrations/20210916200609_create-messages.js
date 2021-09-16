exports.up = function (knex) {
  return knex.schema.createTable('messages', (tbl) => {
    tbl.increments();
    tbl.text('user', 128).notNullable();
    tbl.text('msg', 255).notNullable();
    tbl.text('date', 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages');
};
