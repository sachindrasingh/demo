/*
    server.js

    Main script for our Node.js server.
    This script will create the Express application and add routers for our REST API
*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');

//create an express application
var app = express();

//use the JSON parser from bodyParser
app.use(bodyParser.json());

//serve static files from the /static sub-directory
app.use(express.static(__dirname + '/static'));

//finally, add an error handler that sends back the error info as JSON
app.use(function(err, req, res, next) {
    if (undefined == err.statusCode || 500 == err.statusCode) {
        console.error(err);
    }

    res.status(err.statusCode || 500).json({message: err.message || err.toString()});
});

app.get('/api/send', function (req, res){
    // do something here
});

//start the web server
var server = app.listen('8080', function() {
    console.log('listening for requests sent to http://localhost:%s', server.address().port);
});

