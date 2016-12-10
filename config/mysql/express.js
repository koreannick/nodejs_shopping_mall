

module.exports = function(){

  var express = require('express');
  //추가
  var session = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  var bodyParser = require('body-parser');
  var app = express();

  // view engine setup
  app.set('views', './views/mysql');
  app.set('view engine', 'jade');
  app.use(bodyParser.urlencoded({ extended: false }));

  //세션 사용
  app.use(session({
     secret: '1234DSFs@adf1234!@#$asd',
     resave: false,
     saveUninitialized: true,
     store:new MySQLStore({
       host:'210.125.112.115',
       port:3006,
       user:'pi',
       password:'fpahsk3238',
       database:'o2'
     })
   }));


  return app;
}
