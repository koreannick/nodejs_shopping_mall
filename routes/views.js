var express = require('express');
var views = express.Router();

/* GET home page. */
views.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Express' });
});
views.get('/order', function(req, res, next) {
  res.render('order', { title: 'Express' });
});

module.exports = views;
