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

<<<<<<< HEAD
LESS.css Compiler: compiles styles.less > styles.css
fs.readFile(__dirname+'/public/css/styles.less',function(error,data){
    data = data.toString();
    less.render(data, function (e, css) {
        fs.writeFile(__dirname+'/public/css/styles.css', css, function(err){
            console.log('done');
        });
    });
});

=======
>>>>>>> d8e564c2844081290f2620afdec5a9404ad92fcb
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

