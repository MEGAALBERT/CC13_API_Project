
exports.up = function(knex) {
  return knex.schema.createTable("friends", (table)=>{
    table.increments();
    table.text('friendName');
    table.text('friendLastName');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('friends');
};
