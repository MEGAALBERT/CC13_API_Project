
    exports.up = function(knex) {
        return knex.schema.createTable("friendsGames", (table)=>{
            table.text('friendName');
            table.text('friendLastName');
            table.specificType('games', knex.raw('text[]'));
        });  

    }
    
    exports.down = function(knex) {
        return knex.schema.dropTable('friendsGames');
    };

