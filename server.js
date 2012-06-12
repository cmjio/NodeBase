var url = require("url");
var express = require('express');
var db_helper = require("./db_helper.js");

var http = require("http"),
	 io = require("socket.io"),
	 server = express.createServer();

server.configure(function () {
  server.use(express.static(__dirname + '/public'));
});

server.get('/', function (req, res) {
  res.render('index', { layout: false });
});

server.listen(1234, function(){
	var addr = server.address();
	console.log('app listening on http://' + addr.address + ':' + addr.port);
});	 

var io = io.listen(server);

var clients = {};

io.sockets.on('connection', function(socket){

	clients[socket.id] = socket;

	var userCount = 0;

	socket.on('get_params',function(){
		db_helper.get_params(function(params) {
    		socket.emit('params', params);
  		});
	});

	setInterval(function(){
			var newCount = io.sockets.clients().length;
			if(newCount != userCount){
				userCount = newCount;
				socket.emit('userCount',{count:newCount});
				//socket.emit('users',clients);
			}
	},1000);

	
});