// implement your API here
const express = require('express'); //import the express package
const server = express(); //creates the server

// middleware
server.use(express.json()); //needed to parse JSON

//routes or endpoints
server.get('/api/users', (req, res) => {
    res.send('Hello from Express');
})

//port
const port = 8001;
server.listen(port, () => {
    //start watching for connections on the port specified
    console.log(`**Server running on port: ${port}**`)
})