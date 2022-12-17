//make a server in here
//import express
const express = require('express');
//import body-parser
const bodyParser = require('body-parser');
//import taskRouter
const taskRouter = require('./router/taskRouter')
//import pool
const pool = require('./module/pool.js');

//make express server
const app = express();
//run server on port 5000
const PORT = process.env.PORT || 5000;

//teach server to read JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//upon server access, send the public folder
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', taskRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});