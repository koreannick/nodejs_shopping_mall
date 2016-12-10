var express = require('express');
var views = express.Router();

/* GET home page. */
views.get('/cart', function(req, res, next) {
  if(req.user && req.user.displayName){
  res.render('cart', { title: 'Express',user: req.user.displayName });
}
else{
  res.render('cart',{title: 'Express',user:0 });
}
});
views.get('/order', function(req, res, next) {
  if(req.user && req.user.displayName){
  res.render('order', { title: 'Express',user: req.user.displayName });
}
else{
  res.render('order',{title: 'Express',user:0 });
}
});

module.exports = views;
