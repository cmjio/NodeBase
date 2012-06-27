	/**
 *	NodeBase
 *	file: server.js
 */

// Require modules
var url = require("url"),
	express = require('express'),
	fs = require('fs'),
	less = require('less'),
	http = require("http"),x


// Create Express.js Server
var server = express.createServer();

// Configure server to use directory /public
server.configure(function () {
	server.use(express.static(__dirname + '/public'));
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

