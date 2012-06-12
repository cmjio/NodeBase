var url = require("url"),
	express = require('express'),
	fs = require('fs'),
	less = require('less'),
	http = require("http"),
	io = require("socket.io"); 

var server = express.createServer();
var db_helper = require("./db_helper.js");

server.configure(function () {
  server.use(express.static(__dirname + '/public'));
  console.log(__dirname);
});

fs.readFile(__dirname+'/public/css/style.less',function(error,data){
    data = data.toString();
    less.render(data, function (e, css) {
        fs.writeFile(__dirname+'/public/css/styles.css', css, function(err){
            console.log('done');
        });
    });
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