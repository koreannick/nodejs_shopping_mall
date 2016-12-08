//기본 생성되는 모듈

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var app = require('./config/mysql/express')();
var passport = require('./config/mysql/passport')(app);
var auth = require('./routes/mysql/auth')(passport);
app.use('/auth/',auth);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());



app.use('/', index);
app.use('/users', users);
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

app.listen(3003, function(){
  console.log('http://localhost:3003');
});

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
