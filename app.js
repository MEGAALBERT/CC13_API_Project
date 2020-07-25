// initial set up
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const friendsData = require("./data/data");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// ********************{endpoints}**************************************


// GET ENDPOINTS

// get all my friends
app.get("/friends", (req, res) => {
    res.send(friendsData.friends);
})

// get all the games I'm interested
app.get("/gamesInterested", (req, res) => {
    res.send(friendsData.games);
})

//get an address of a friend by name
app.get("/address/:name", (req, res) => {
    const name = req.params.name;
    const foundFriend = friendsData.address.filter( friend => {
        return friend.friendName === name;
    })
    res.send(foundFriend);
})

// get the games a friend has
app.get("/friendsGames/:name", (req, res) => {
    const name = req.params.name;
    const foundFriend = friendsData.friendGames.filter( friend => {
        return friend.friendName === name;
    })
    res.send(foundFriend);
})

//get all friends that have a particular game
app.get("/friendsGames/:game/friends",(req,res) => {
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

//POST ENDPOINTS

// POST a new friend
app.post("/friends", (req,res)=> {
    const newFriend = {
        friendName: req.body.name,
		friendLastName: req.body.lastName,
    }
    friendsData.friends.push(newFriend);
    res.send(friendsData.friends);
})

//POST new insterested game
app.post("/gamesInterested", (req,res) => {
    const newGame = {
        name : req.body.name,
    }
    friendsData.games.push(newGame);
    res.send(friendsData.games);
})


// PATCH ENDPOINTS

//Patch ad a game to a friend
app.patch("/friends/:name", (req,res)=> {
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
    app.patch("/address/:name",(req,res)=> {
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

// Delete friend
app.delete("/friends/:name", (req,res)=>{
    const name = req.params.name;
    const result = friendsData.friends.filter(friend => {
        return friend.friendName !== name
    })
    res.send(result);
})

// Delete game not interested anymore
app.delete("/notInterested/:name",(req,res)=>{
    const game = req.params.name;
    const result = friendsData.games.filter(value => {
        return value.name !== game;
    })
    res.send(result);
})

//Patch change my friend address

// ********************{endpoints}**************************************
// server port set up

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is istening!!")
});

// express to host static files
app.use(express.static('public'));

// error handler
app.use((err,req,res,next)=> {
res.status(err.status || 500);
res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
});
})