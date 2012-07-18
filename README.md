Node.js Base Application by Chris Johnson
===

NodeBase is a custom built web application framework built on top of some of the webs favourite languages and technologies.  With NodeBase you can get started with Web Sockets, MySQL & LESS.

# Prerequisites
For this to work you must have `node.js` installed on the computer or server you are working from.  Visit [http://nodejs.org/](http://nodejs.org/ "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.") for installation guides.

# How to install

Using either your commandline application or via a Git GUI application clone the latest version of NodeBase into your chosen directory.

	cd /your_chosen_directory
	git clone git@github.com:edgeui/NodeBase.git your_application_name

This will create a folder with the name `your_application_name` you selected for the step above. Inside that folder will be the files you work with.  The next step is to open up the NodeBase project in your editor of choice. Look for the following file in your project:

	/NodeBase/db_helper.js

Edit the following lines with your MySQL database settings
	
	var MYSQL_HOST = 'localhost';
	var MYSQL_USERNAME = 'username';
	var MYSQL_PASSWORD = 'password';
	var NEW_DB_NAME = 'database_name';

Save the file then in your command line application navigate into your NodeBase project and start the server.

	cd /your_application_name
	node server.js

This will run the node.js server and create a database and create a table called `params` in the database specified above.

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

This table will eventually be populated with your application settings that you require for functions and methods.