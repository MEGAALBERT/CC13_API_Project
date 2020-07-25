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
app.get("/gamesIntered", (req, res) => {
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