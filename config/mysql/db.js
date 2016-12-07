module.exports = function(){

  var mysql = require('mysql');
  var conn = mysql.createConnection({
    host : '210.125.112.115',
    port: 3006,
    user : 'pi',
    password : 'fpahsk3238',
    database : 'o2'
  });
  conn.connect();

  return conn;
}
