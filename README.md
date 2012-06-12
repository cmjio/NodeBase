Node.js Base
============

var tableParams = ""+
          "create table params("+
          " id int(11) NOT NULL AUTO_INCREMENT,"+
          " name varchar(255) NOT NULL,"+
          " value varchar(255) NOT NULL,"+
          " created datetime DEFAULT NULL,"+
          " modified datetime DEFAULT NULL,"+
          " primary key (id),"+
          " key name (name)"+
          ");";
// Build Table 
client.query(tableParams, function(err) {
  if (err) { throw err; }
});
console.log('table params is created.');