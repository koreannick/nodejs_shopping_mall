//기본 생성되는 모듈

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//추가
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bkfd2Password = require("pbkdf2-password");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var hasher = bkfd2Password();
var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'fpahsk3238',
  database : 'o2'
});
conn.connect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//세션 사용
app.use(session({
  secret: '40105fddb9e58ceb81d196e7a35c33bf',
  resave: false,
  saveUninitialized: true,
  stroe: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'fpahsk3238',
    database:'o2'
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/count',function(req,res){
  if(req.session.count){
    req.session.count++;
  } else{
    req.session.count = 1;
  }
  res.send('count : '+req.session.count);
 });

 app.get('/auth/logout', function(req, res){
   req.logout();
   req.session.save(function(){
     res.redirect('/welcome');
   });
 });
 app.get('/welcome', function(req, res){
   if(req.user && req.user.displayName) {
     res.send(`
       <h1>Hello, ${req.user.displayName}</h1>
       <a href="/auth/logout">logout</a>
     `);
   } else {
     res.send(`
       <h1>Welcome</h1>
       <ul>
         <li><a href="/auth/login">Login</a></li>
         <li><a href="/auth/register">Register</a></li>
       </ul>
     `);
   }
 });
 passport.serializeUser(function(user, done) {
   console.log('serializeUser', user);
   done(null, user.authId);
 });
 passport.deserializeUser(function(id, done) {
   console.log('deserializeUser', id);
   for(var i=0; i<users.length; i++){
     var user = users[i];
     if(user.authId === id){
       return done(null, user);
     }
   }
   done('There is no user.');
 });
 passport.use(new LocalStrategy(
   function(username, password, done){
     var uname = username;
     var pwd = password;
     var sql = 'SELECT * FROM users WHERE authId=?';
     conn.query(sql, ['local:'+uname],function(err,results){
       console.log(results);
       if(err){
        return done('there is no user.') ;
       }
     });
    //  for(var i=0; i<users.length; i++){
    //    var user = users[i];
    //    if(uname === user.username) {
    //      return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
    //        if(hash === user.password){
    //          console.log('LocalStrategy', user);
    //          done(null, user);
    //        } else {
    //          done(null, false);
    //        }
    //      });
    //    }
    //  }
    //  done(null, false);
   }
 ));
 passport.use(new FacebookStrategy({
     clientID: '1602353993419626',
     clientSecret: '232bc1d3aca2199e6a27eb983e602e0b',
     callbackURL: "/auth/facebook/callback",
     profileFields:['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName']
   },
   function(accessToken, refreshToken, profile, done) {
     console.log(profile);
     var authId = 'facebook:'+profile.id;
     for(var i=0; i<users.length; i++){
       var user = users[i];
       if(user.authId === authId){
         return done(null, user);
       }
     }
     var newuser = {
       'authId':authId,
       'displayName':profile.displayName,
       'email':profile.emails[0].value
     };
     users.push(newuser);
     done(null, newuser);
   }
 ));
 app.post(
   '/auth/login',
   passport.authenticate(
     'local',
     {
       successRedirect: '/welcome',
       failureRedirect: '/auth/login',
       failureFlash: false
     }
   )
 );
 app.get(
   '/auth/facebook',
   passport.authenticate(
     'facebook',
     {scope:'email'}
   )
 );
 app.get(
   '/auth/facebook/callback',
   passport.authenticate(
     'facebook',
     {
       successRedirect: '/welcome',
       failureRedirect: '/auth/login'
     }
   )
 );
 var users = [
   {
     authId:'local:egoing',
     username:'egoing',
     password:'mTi+/qIi9s5ZFRPDxJLY8yAhlLnWTgYZNXfXlQ32e1u/hZePhlq41NkRfffEV+T92TGTlfxEitFZ98QhzofzFHLneWMWiEekxHD1qMrTH1CWY01NbngaAfgfveJPRivhLxLD1iJajwGmYAXhr69VrN2CWkVD+aS1wKbZd94bcaE=',
     salt:'O0iC9xqMBUVl3BdO50+JWkpvVcA5g2VNaYTR5Hc45g+/iXy4PzcCI7GJN5h5r3aLxIhgMN8HSh0DhyqwAp8lLw==',
     displayName:'Egoing'
   }
 ];
 app.post('/auth/register', function(req, res){
   hasher({password:req.body.password}, function(err, pass, salt, hash){
     var user = {
       authId:'local:'+req.body.username,
       username:req.body.username,
       password:hash,
       salt:salt,
       displayName:req.body.displayName
     };
     //mysql 등록
     var sql = 'INSERT INTO users SET ?';
     conn.query(sql, user, function(err, results){
       if(err){
         console.log(err);
         res.status(500);
       } else{
         res.redirect('/welcome');
       }
     });

    //  req.login(user, function(err){
    //    req.session.save(function(){
    //      res.redirect('/welcome');
    //    });
    //  });
   });
 });
 app.get('/auth/register', function(req, res){
   var output = `
   <h1>Register</h1>
   <form action="/auth/register" method="post">
     <p>
       <input type="text" name="username" placeholder="username">
     </p>
     <p>
       <input type="password" name="password" placeholder="password">
     </p>
     <p>
       <input type="text" name="displayName" placeholder="displayName">
     </p>
     <p>
       <input type="submit">
     </p>
   </form>
   `;
   res.send(output);
 });
 app.get('/auth/login', function(req, res){
   var output = `
   <h1>Login</h1>
   <form action="/auth/login" method="post">
     <p>
       <input type="text" name="username" placeholder="username">
     </p>
     <p>
       <input type="password" name="password" placeholder="password">
     </p>
     <p>
       <input type="submit">
     </p>
   </form>
   <a href="/auth/facebook">facebook</a>
   `;
   res.send(output);
 });
 app.listen(3003, function(){
   console.log('Connected 3003 port!!!');
 });



/*
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/
