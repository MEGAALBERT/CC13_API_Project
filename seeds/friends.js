const friends = require("../seedFriends");

exports.seed = function(knex, Promise) {
  return knex('friends').del()
    .then(function () {
      return knex('friends').insert(friends);
    });
};

