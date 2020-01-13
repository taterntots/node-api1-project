// implement your API here
const express = require('express'); //import the express package
const database = require('./data/db'); //our database library
const server = express(); //creates the server

// middleware
server.use(express.json()); //needed to parse JSON

//routes or endpoints
server.post('/api/users', (req, res) => {
    const userData = req.body; //for this to work you need the server.use(express.json()); above

    database.insert(userData)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' });
        })
})

server.get('/api/users', (req, res) => {
    database.find()
        .then(data => {
            console.log('data', data);
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The users information could not be retrieved' });
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    database.findById(id)
        .then(find => {
            console.log('find', find);
            res.status(200).json(find);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The user information could not be retrieved' });
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    database.remove(id)
        .then(deleted => {
            console.log('deleted', deleted);
            res.status(200).json(deleted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The user could not be removed' });
        })
})

//port
const port = 8001;
server.listen(port, () => {
    //start watching for connections on the port specified
    console.log(`**Server running on port: ${port}**`)
})