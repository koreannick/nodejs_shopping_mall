module.exports = function(){
  var conn = require('../config/mysql/db')();
  var express = require('express');
  var fs = require('fs');             //모듈 불러오기file system
  var async =require('async');    //모듈 불러오기
  var multer = require('multer');
  var orgname;
  var savename;
  var _storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'uploads/');
    },
    filename: function(req,file,cb){
      cb(null,savename=(file.fieldname+Date.now()+'.jpg'));
      orgname=file.originalname;
    }
  })
  var upload = multer({ storage: _storage })
  var admin = express.Router();


  admin.post('/management',upload.single('product_image') ,function(req, res){



    var products ={
      product_name:req.body.product_name,
      product_code:req.body.product_code,
      product_price:req.body.product_price,
      product_from:req.body.product_from,
      product_brand:req.body.product_brand,
      product_birthday:req.body.product_birthday,
      product_orgfilename:orgname,
      product_savefilename:savename,
      product_define:req.body.product_define
    }
      conn.query(("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8' "),
      products, function(err, results){
        if(err){
          console.log(err);
          res.status(500);
        } else {
          console.log('good');
          }
        });
      var sql = 'INSERT INTO products SET ?';
      conn.query(sql, products, function(err, results){
        if(err){
          console.log(err);
          res.status(500);
        } else {
          console.log('good');
          res.render('/admin', { title: 'Express' });
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
