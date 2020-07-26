// initial set up
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const friendsData = require("./data/data");
const knex = require('./db/knex'); //Knex connection
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// ********************{endpoints}**************************************


// GET ENDPOINTS

// get all my friends DB-----
app.get("/api/friends", (req, res) => {
    getAllFriends().then(friends => {
        res.send(friends);
    });
});
 

// get all the games I'm interested DB-----
app.get("/api/gamesInterested", (req, res) => {
    getAllGames().then(games => {
        res.send(games);
    })
})

//get an address of a friend by name
app.get("/api/address/:name", (req, res) => {
    const name = req.params.name;
    const foundFriend = friendsData.address.filter( friend => {
        return friend.friendName === name;
    })
    res.send(foundFriend);
})

// get the games a friend has DB-----
app.get("/api/friendsGames/:name", (req, res) => {
    getOneFriend(req.params.name).then(friend => {
        if(friend) {
          res.json(friend);
        } else {
          next();
        }
      });
    });

//get all friends that have a particular game 
app.get("/api/friendsGames/:game/friends",(req,res) => {
const game = req.params.game;
const selectFriends = [];
for ( let i = 0; i< friendsData.friendGames.length; i++){
    let games = friendsData.friendGames[i].games;
    for(let j = 0; j< games.length; j++){
        if(games[j]===game){
            selectFriends.push(friendsData.friendGames[i])
        }
    }
}
res.send(selectFriends);
});

//***TO FIX****
app.get("/api/friendsGames/:game/friends2",(req,res) => {
    getAllFriendsGames(req.params.game).then(friends => {
        res.send(friends)
        })
    });

//POST ENDPOINTS

// POST a new friend
app.post("/api/friends", (req,res)=> {
    const newFriend = {
        friendName: req.body.name,
		friendLastName: req.body.lastName,
    }
    friendsData.friends.push(newFriend);
    res.send(friendsData.friends);
})

//POST new insterested game DB -----

app.post("/api/gamesInterested", (req,res) => {
    createGame(req.body).then(game => {
        res.send(game);
    })
})

// PATCH ENDPOINTS

//Update a friends name DB-----
app.patch("/api/friends/:name", (req,res)=>{
    updateFriend(req.params.name , req.body).then(friend => {
        res.send(friend);
    })
})

//Patch ad a game to a friend
app.patch("/api/friendsGame/:name", (req,res)=> {
    const name = req.params.name;
    let friend;
    const newGame = {
        name: req.body.name,
    }
    for ( let i = 0; i< friendsData.friendGames.length; i++){
        if(friendsData.friendGames[i].friendName === name){
            friendsData.friendGames[i].games.push(newGame.name);
            friend = friendsData.friendGames[i];
        }
        }
        res.send(friend);
    })

    //Patch change a friend address
    app.patch("/api/address/:name",(req,res)=> {
        let name = req.params.name;
        let friend;
    for ( let i = 0; i< friendsData.address.length; i++){
        if(friendsData.address[i].friendName === name){
            friendsData.address[i]["friendAd"].city = req.body.city,
            friendsData.address[i]["friendAd"].streetName = req.body.streetName,
            friendsData.address[i]["friendAd"].streeAdress = req.body.streeAdress,
            friend = friendsData.address[i];
            } 
        }
        res.send({friend});
    })

// DELETE ENDPOINTS

// Delete friend DB-----
app.delete("/api/friends/:name", (req,res)=>{
    deleteFriend(req.params.name).then(()=> {
        res.send("deleted:true");
    })
})

// Delete game not interested anymore DB-----
app.delete("/api/notInterested/:name",(req,res)=>{
    deleteGame(req.params.name).then(()=> {
        res.send("deleted:true");
    })
})



//**************db helper funcions*******************************/

const getAllFriends= ()=>{
    return knex('friends');
}

const getAllGames= ()=>{
    return knex('interestedGames');
}

const getAllFriendsGames = (game)=>{
    return knex('friendsGames').whereIn('games', [game]);
}

const getOneFriend =(name)=> {
    return knex('friendsGames').where('friendName', name).first();
  }

  const createGame = (game)=> {
      return knex('interestedGames').insert(game, '*');
  }

  const updateFriend = (name, friendName) => {
      return knex('friends').where('friendName', name).update(friendName, '*');
  }

  const deleteFriend = (name) => {
      return knex('friends').where('friendName', name).del();
  }

  const deleteGame = (game) => {
      return knex('interestedGames').where('name', game).del();
  }

//***********************************************/



// ********************{endpoints}**************************************
// SERVER SET UP

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is istening!!")
});

// express to host static files
app.use(express.static(path.join(__dirname,'public')));


// error handler
app.use((err,req,res,next)=> {
res.status(err.status || 500);
res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
});
})