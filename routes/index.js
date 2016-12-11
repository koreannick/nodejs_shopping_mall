var express = require('express');
var router = express.Router();
var conn = require('../config/mysql/db')();


router.get('/carts',function(req,res){
var cart={
  id:req.body.id,
  authId:req.user.authId
};
var sql = 'INSERT INTO carts SET ?';
conn.query(sql,cart,function(err,results){
  if(err){
    console.log(err);
    res.status(500);
  } else{
    res.redirect('/');
  }
})

});
/* GET home page. */
router.get('/', function(req, res, next) {

  var sql = 'SELECT id,product_name,product_price,product_savefilename,product_from FROM products';

  conn.query(sql,function(err,rows,fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      console.log(rows);
      if(req.user && req.user.displayName){
      res.render('index', { title: 'Express',user: req.user.displayName, products: rows });
    }
    else{
      res.render('index',{title: 'Express',user:0, products: rows });
    }
    }
  });

});

module.exports = router;
