// implement your API here
const express = require('express'); //import the express package
const database = require('./data/db'); //our database library
const server = express(); //creates the server

// middleware
server.use(express.json()); //needed to parse JSON

//routes or endpoints
server.post('/api/users', (req, res) => {
    const hubData = req.body; //for this to work you need the server.use(express.json()); above
})

server.get('/api/users', (req, res) => {
    database.find()
        .then(data => {
            console.log('data', data);
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
        })
})

//port
const port = 8001;
server.listen(port, () => {
    //start watching for connections on the port specified
    console.log(`**Server running on port: ${port}**`)
})