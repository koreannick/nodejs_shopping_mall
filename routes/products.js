var express = require('express');
var products = express.Router();

/* GET home page. */
products.get('/new', function(req, res, next) {
  res.render('products/new', { title: 'Express' });
});
products.get('/bestseller', function(req, res, next) {
  res.render('products/bestseller', { title: 'Express' });
});
products.get('/sale', function(req, res, next) {
  res.render('products/sale', { title: 'Express' });
});
products.get('/special', function(req, res, next) {
  res.render('products/special', { title: 'Express' });
});
products.get('/etc', function(req, res, next) {
  res.render('products/etc', { title: 'Express' });
});

module.exports = products;
