
//const friends2 = require("./seedFriends.js");

exports.seed = function(knex, Promise) {
  return knex('friends').del()
    .then(function () {
      return knex('friends').insert(friends);
    });
};

const friends = [
  {
      friendName: "Kayla",
      friendLastName: "Kovacek"
  },
  {
      friendName: "Corbin",
      friendLastName: "Conn"
  },
  {
      friendName: "Frederic",
      friendLastName: "Quitzon"
  },
  {
      friendName: "Marielle",
      friendLastName: "Cummerata"
  },
  {
      friendName: "Oma",
      friendLastName: "Pagac"
  },
  {
      friendName: "Dagmar",
      friendLastName: "Luettgen"
  },
  {
      friendName: "Ena",
      friendLastName: "Gutmann"
  },
  {
      friendName: "Adriana",
      friendLastName: "Olson"
  },
  {
      friendName: "Levi",
      friendLastName: "Carter"
  },
  {
      friendName: "Khalid",
      friendLastName: "Funk"
  },
  {
      friendName: "Donny",
      friendLastName: "Brekke"
  },
  {
      friendName: "Constance",
      friendLastName: "Thiel"
  },
  {
      friendName: "Newell",
      friendLastName: "Baumbach"
  },
  {
      friendName: "Beverly",
      friendLastName: "Moen"
  },
  {
      friendName: "Ciara",
      friendLastName: "Kutch"
  },
  {
      friendName: "Arnaldo",
      friendLastName: "Koelpin"
  },
  {
      friendName: "Maggie",
      friendLastName: "Witting"
  },
  {
      friendName: "Doris",
      friendLastName: "Baumbach"
  },
  {
      friendName: "Elijah",
      friendLastName: "DuBuque"
  },
  {
      friendName: "Lewis",
      friendLastName: "Kreiger"
  }
]
