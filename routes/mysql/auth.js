module.exports = function(passport){
  //router화
  var bkfd2Password = require("pbkdf2-password");
  var hasher = bkfd2Password();
  var conn = require('../../config/mysql/db')();
  var route = require('express').Router();

  route.post(
    '/login',
    passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: false
      }
    )
  );
  route.get(
    '/facebook',
    passport.authenticate(
      'facebook',
      {scope:'email'}
    )
  );
  route.get(
    '/facebook/callback',
    passport.authenticate(
      'facebook',
      {
        successRedirect: '/',
        failureRedirect: '/auth/login'
      }
    )
  );

  route.post('/register', function(req, res){
    hasher({password:req.body.password}, function(err, pass, salt, hash){
      var user = {
        authId:'local:'+req.body.username,
        username:req.body.username,
        password:hash,
        salt:salt,
        displayName:req.body.displayName
      };
      var sql = 'INSERT INTO users SET ?';
      conn.query(sql, user, function(err, results){
        if(err){
          console.log(err);
          res.status(500);
        } else {
          req.login(user, function(err){
            req.session.dsplayName = user.displayName;
            req.session.save(function(){
              res.redirect('/');
            });
          });
        }
      });
    });
  });
  route.get('/register', function(req, res){
    if(req.user && req.user.displayName){
  res.render('auth/register', { title: 'Express',user: req.user.displayName });
}
else{
  res.render('auth/register',{title: 'Express',user:0 });
}
  });
  route.get('/login', function(req, res){
    if(req.user && req.user.displayName){
  res.render('auth/login', { title: 'Express',user: req.user.displayName });
}
else{
  res.render('auth/login',{title: 'Express',user:0 });
}
  });
  route.get('/logout', function(req, res){
     req.logout();
     req.session.delete;
     req.session.save(function(){
       res.redirect('/');
     });
   });

  return route;
}
