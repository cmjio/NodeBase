Node.js Base Application
===

NodeBase is a custom built web application framework built on top of some of the webs favourite languages and technologies.  With NodeBase you can get started with Web Sockets, MySQL & LESS.

## How to install

Using either your commandline application or via a Git GUI application clone the latest version of NodeBase into your chosen directory.

	cd /your_chosen_dir
	git clone git@github.com:edgeui/NodeBase.git NodeBase

This will create a folder called NodeBase with the files inside your chosen directory.  The next step is to open up the NodeBase project in your editor of choice. Look for the following file in your project:

	/NodeBase/db_helper.js

Edit the following lines with your MySQL database settings
	
	var MYSQL_HOST = 'localhost';
	var MYSQL_USERNAME = 'username';
	var MYSQL_PASSWORD = 'password';
	var NEW_DB_NAME = 'database_name';

Save the file then in your command line application navigate to your NodeBase project and start the server.

	cd /NodeBase
	node server.js

This will run the server and create a database and create a table called 'params' in that database.

	var tableParams = "“+ 
	”create table params(“+ ” id int(11) NOT NULL AUTO_INCREMENT,“+ 
	” name varchar(255) NOT NULL,“+ 
	” value varchar(255) NOT NULL,“+ 
	” created datetime DEFAULT NULL,“+ 
	” modified datetime DEFAULT NULL,“+ 
	” primary key (id),“+ 
	” key name (name)“+ 
	”);"; 
	// Build Table 
	client.query(tableParams, function(err) { 
		if (err) { throw err; } 
	}); 
	console.log(‘table params is created.’);

