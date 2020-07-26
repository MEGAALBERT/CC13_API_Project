## This was created during my time as a student at Code Chrysalis

# API Solo Project Friends with Games (WIP).

Creating a CRUD API service using Express, Knex and Postgres.

For Gamers that want to keep track of the games a friend has and you can borrow.

This repo is a wip made to learn Backend in code Chrysalis.

## What is it?

It is a API project create to control the friends we have and what videogames they have so we can borrow them! ;)

## Endpoints

These are the endpoints we can use to work on our database, to see information (GET), to add information (POST), to change information (PATCH) and of course to delete information (DELETE)

### GET Endpoints

- "http://localhost:4000/api/friends" Get all friends

- "http://localhost:4000/api/gamesInterested" Get all games the user is interested

- "http://localhost:4000/api/friendsGames/:name" Get the games a friend has to borrow!

### POST Endpoints

- "http://localhost:4000/api/friends" Add a new friend

- "http://localhost:4000/api/gamesInterested" Add a new game the user is interested

### Patch Endpoints

- "http://localhost:4000/api/friends/:name" Update a friend name

### Delete Endpoints 

- - "http://localhost:4000/api/friends/:name" Delete a friend

## Schema (WIP)

This is the final schema to link the game table with friends table and know what game they have we can borrow!

![image](/Schema.JPG)