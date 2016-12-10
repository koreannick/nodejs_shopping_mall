module.exports = function(){
  var conn = require('../config/mysql/db')();
  var express = require('express');
  var admin = express.Router();


  admin.post('/management', function(req, res){
    var products ={
      product_name:req.body.product_name,
      product_code:req.body.product_code,
      product_price:req.body.product_price,
      product_from:req.body.product_from,
      product_brand:req.body.product_brand,
      product_birthday:req.body.product_birthday,
      product_image:req.body.product_image,
      product_define:req.body.product_define
    }
      var sql = 'INSERT INTO products SET ?';
      conn.query(sql, products, function(err, results){
        if(err){
          console.log(err);
          res.status(500);
        } else {
          condole.log('good');
          }
        });
      });

  /* GET home page. */
  admin.get('/', function(req, res, next) {
    res.render('admin/admin', { title: 'Express' });
  });
  admin.get('/management', function(req, res, next) {
    res.render('admin/management', { title: 'Express' });
  });

    return admin;
  }
