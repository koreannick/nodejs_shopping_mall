var express = require('express');
var products = express.Router();

/* GET home page. */
products.get('/new', function(req, res, next) {
  if(req.user && req.user.displayName){
    res.render('products/new', { title: 'Express',user: req.user.displayName });
  }
  else{
    res.render('products/new',{title: 'Express',user:0 });
  }

});
products.get('/bestseller', function(req, res, next) {
  if(req.user && req.user.displayName){
    res.render('products/bestseller', { title: 'Express',user: req.user.displayName });
  }
  else{
    res.render('products/bestseller',{title: 'Express',user:0 });
  }
});
products.get('/sale', function(req, res, next) {
  if(req.user && req.user.displayName){
  res.render('products/sale', { title: 'Express',user: req.user.displayName });
}
else{
  res.render('products/sale',{title: 'Express',user:0 });
}
});
products.get('/special', function(req, res, next) {
    if(req.user && req.user.displayName){
    res.render('products/special', { title: 'Express',user: req.user.displayName });
  }
  else{
    res.render('products/special',{title: 'Express',user:0 });
  }
});
products.get('/etc', function(req, res, next) {
  if(req.user && req.user.displayName){
  res.render('products/etc', { title: 'Express',user: req.user.displayName });
}
else{
  res.render('products/etc',{title: 'Express',user:0 });
}
});

module.exports = products;
