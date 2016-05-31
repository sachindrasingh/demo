var express = require("express");
var redis = require("redis");
var sio = require("socket.io");

var client = redis.createClient()
var app = express.createServer();
var io = sio.listen(app);

io.set("store", new sio.RedisStore);


// In this example we have one master client socket 
// that receives messages from others.

io.sockets.on('connection', function(socket) {

  // Promote this socket as master
  socket.on("I'm the master", function() {

    // Save the socket id to Redis so that all processes can access it.
    client.set("mastersocket", socket.id, function(err) {
      if (err) throw err;
      console.log("Master socket is now" + socket.id);
    });
  });

  socket.on("message to master", function(msg) {

    // Fetch the socket id from Redis
    client.get("mastersocket", function(err, socketId) {
      if (err) throw err;
      io.sockets.socket(socketId).emit(msg);
    });
  });

});
