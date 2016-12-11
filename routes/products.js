var express = require('express');
var products = express.Router();
var conn = require('../config/mysql/db')();
/* GET home page. */
products.get('/new', function(req, res, next) {

  var sql = 'SELECT id,product_name,product_price,product_savefilename FROM products WHERE product_from="NEW" ';

  conn.query(sql,function(err,rows,fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      console.log(rows);
      if(req.user && req.user.displayName){
      res.render('products/new', { title: 'Express',user: req.user.displayName, products: rows });
    }
    else{
      res.render('products/new',{title: 'Express',user:0, products: rows });
    }
    }
  });
});

products.get('/bestseller', function(req, res, next) {

  var sql = 'SELECT id,product_name,product_price,product_savefilename FROM products WHERE product_from="BESTSELLER"';

  conn.query(sql,function(err,rows,fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      console.log(rows);
      if(req.user && req.user.displayName){
      res.render('products/bestseller', { title: 'Express',user: req.user.displayName, products: rows });
    }
    else{
      res.render('products/bestseller',{title: 'Express',user:0, products: rows });
    }
    }
  });
});


products.get('/sale', function(req, res, next) {


    var sql = 'SELECT id,product_name,product_price,product_savefilename FROM products WHERE product_from="SALE"';

    conn.query(sql,function(err,rows,fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      else{
        console.log(rows);
        if(req.user && req.user.displayName){
        res.render('products/sale', { title: 'Express',user: req.user.displayName, products: rows });
      }
      else{
        res.render('products/sale',{title: 'Express',user:0, products: rows });
      }
      }
    });

});


products.get('/special', function(req, res, next) {

  var sql = 'SELECT id,product_name,product_price,product_savefilename FROM products WHERE product_from="SPECIAL"';

  conn.query(sql,function(err,rows,fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      console.log(rows);
      if(req.user && req.user.displayName){
      res.render('products/special', { title: 'Express',user: req.user.displayName, products: rows });
    }
    else{
      res.render('products/special',{title: 'Express',user:0, products: rows });
    }
    }
  });
});

  products.get('/etc', function(req, res, next) {

    var sql = 'SELECT id,product_name,product_price,product_savefilename FROM products WHERE product_from="ETC"';

    conn.query(sql,function(err,rows,fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      else{
        console.log(rows);
        if(req.user && req.user.displayName){
        res.render('products/etc', { title: 'Express',user: req.user.displayName, products: rows });
      }
      else{
        res.render('products/etc',{title: 'Express',user:0, products: rows });
      }
      }
    });

});


module.exports = products;
