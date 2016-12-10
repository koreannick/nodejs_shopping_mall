var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.user && req.user.displayName){
    res.render('index', { title: 'Express',user: req.user.displayName });
  }
  else{
    res.render('index',{title: 'Express',user:0 });
  }

});

module.exports = router;
