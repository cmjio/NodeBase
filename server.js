	/**
 *	NodeBase
 *	file: server.js
 */

// Require modules
var url = require("url"),
	express = require('express'),
	fs = require('fs'),
	less = require('less'),
	http = require("http"),
	io = require("socket.io"); 

// Require Database script
var db_helper = require("./db_helper.js");

// Create Express.js Server
var server = express.createServer();

// Configure server to use directory /public
server.configure(function () {
	server.use(express.static(__dirname + '/public'));
});

LESS.css Compiler: compiles styles.less > styles.css
fs.readFile(__dirname+'/public/css/styles.less',function(error,data){
    data = data.toString();
    less.render(data, function (e, css) {
        fs.writeFile(__dirname+'/public/css/styles.css', css, function(err){
            console.log('done');
        });
    });
});

// Routes
server.get('/', function (req, res) {
	res.render('index', { layout: false });
});

server.get('/admin', function (req, res) {
	res.render('/admin/index', { layout: false });
});

// Setting :PORT for server
server.listen(1234, function(){
	var addr = server.address();
	console.log('app listening on http://' + addr.address + ':' + addr.port);
});	 

// Socketio listening to server
var io = io.listen(server);

// Socket.io Clients obj, used by server
var clients = {};

io.sockets.on('connection', function(socket){

	var userCount = 0;

	clients[socket.id] = socket;

	socket.on('get_params',function(){
		db_helper.get_params(function(params) {
    		socket.emit('params', params);
  		});
	});

	// Emit connected user count every second (1000ms) if it changes
	setInterval(function(){
			var newCount = io.sockets.clients().length;
			if(newCount != userCount){
				userCount = newCount;
				socket.emit('userCount',{count:newCount});
				//socket.emit('users',clients);
			}
	},1000);
	
});