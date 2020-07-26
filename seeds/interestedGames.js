const interestedGames = require("../seedInterestedGames");

exports.seed = function(knex) {
  return knex('interestedGames').del()
    .then(function () {
      return knex('interestedGames').insert(interestedGames);
    });
};
