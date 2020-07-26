exports.up = function(knex) {
    return knex.schema.createTable("interestedGames", (table)=>{
      table.text('name');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('games');
  };
