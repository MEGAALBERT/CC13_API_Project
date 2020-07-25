const games = require("../seedGames");

exports.seed = function(knex) {
  return knex('friendsGames').del()
    .then(function () {
      return knex('friendsGames').insert(games);
    });
};
