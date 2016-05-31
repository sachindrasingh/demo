var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
var client = {};
io.on('connection', function(socket) {
    socket.on('join', function(data, e) {
        //socket.join(data.email); // We are using room of socket io
        client[data.usrId] = this.id;
        // console.log(this.id, data)
    });
    socket.on('chat message', function(msg) {
        // io.emit('chat message', msg);
        // io.sockets.connected[client[msg.usr]].emit('chat message', msg);
        var id = client[msg.usr];
    	socket.broadcast.to(id).emit('chat message', msg);
    	// console.log(msg, id);
    });
	socket.on("disconnected", function(e){
		console.log("&&&&&&&&&", e)
	});
});



http.listen(3000, function() {
    console.log('listening on *:3000');
});
