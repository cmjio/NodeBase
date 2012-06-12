var mysql = require('mysql');
var MYSQL_USERNAME = 'root';
var MYSQL_PASSWORD = '';
var NEW_DB_NAME = 'edge_dev_1';
var NEW_INSTALL = false;
 
var client = mysql.createClient({
  host:'127.0.0.1',
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD
});

if(NEW_INSTALL){
  // destroy old db
  client.query('DROP DATABASE IF EXISTS '+NEW_DB_NAME, function(err) {
    if (err) { throw err; }
  });
   
  //create database
  client.query('CREATE DATABASE '+NEW_DB_NAME, function(err) {
    if (err) { throw err; }
  });
  console.log('database '+NEW_DB_NAME+' is created.');
}


// Use newly created database
client.query('USE '+NEW_DB_NAME);

if(NEW_INSTALL){
  // // create table
  var sql = ""+
  "create table params("+
  " id int(11) NOT NULL AUTO_INCREMENT,"+
  " name varchar(255) NOT NULL,"+
  " value varchar(255) NOT NULL,"+
  " created datetime DEFAULT NULL,"+
  " modified datetime DEFAULT NULL,"+
  " primary key (id),"+
  " key name (name)"+
  ");";
  // 
  client.query(sql, function(err) {
    if (err) { throw err; }
  });
  console.log('table params is created.');
}


// function to create employee
exports.add_employee = function(data, callback) {
 client.query("insert into employees (name, salary) values (?,?)", [data.name, data.salary], function(err, info) {
    // callback function returns last insert id
    callback(info.insertId);
    console.log('Employee '+data.name+' has salary '+data.salary);
  });
}
 
/**
 * get_params()
 * Queries the DB for the params for the application, and returns them in a JSON format
 * @param  {Function} callback [description]
 * @return JSON            [description]
 */
exports.get_params = function(callback) {
  client.query("select * from params", function(err, results, fields) {
    // callback function returns employees array
    //console.log(err,results,fields);
    callback(JSON.stringify(results));
  });
}