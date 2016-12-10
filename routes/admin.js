var express = require('express');
var admin = express.Router();

/* GET home page. */
admin.get('/', function(req, res, next) {
  res.render('admin/admin', { title: 'Express' });
});

module.exports = admin;
