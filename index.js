// implement your API here
const express = require('express'); //import the express package
const database = require('./data/db'); //our database library
const server = express(); //creates the server

// middleware
server.use(express.json()); //needed to parse JSON

//routes or endpoints
server.post('/api/users', (req, res) => {
    const userData = req.body; //for this to work you need the server.use(express.json()); above

    if (!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' });
    } else {
        database.insert(userData)
            .then(user => {
                console.log('added user', user);
                res.status(201).json(user);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' });
            })
    }
})

server.get('/api/users', (req, res) => {
    database.find()
        .then(users => {
            console.log('users', users);
            res.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The users information could not be retrieved' });
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    database.findById(id)
        .then(user => {
            if (user) {
                console.log('find user', user);
                res.status(200).json(user);
            } else {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The user information could not be retrieved' });
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    database.remove(id)
        .then(user => {
            if (user) {
                console.log('user deleted', user);
                res.status(200).json(user);
            } else {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'The user could not be removed' });
        })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if (!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' });
    } else {
        database.update(id, changes)
            .then(user => {
                if (user) {
                    console.log('user edited', user);
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ errorMessage: 'The user with the specified ID does not exist' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage: 'The user information could not be modified' });
            })
    }
})

//port
const port = 8001;
server.listen(port, () => {
    //start watching for connections on the port specified
    console.log(`**Server running on port: ${port}**`)
})