exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', tbl =>{
    tbl.increments('id');
    tbl.varchar('vin', 17).unique().notNullable();
    tbl.varchar('make', 128).notNullable();
    tbl.varchar('model', 128).notNullable();
    tbl.integer('mileage').notNullable();
    tbl.varchar('title', 128);
    tbl.varchar('transmission', 128);
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};
