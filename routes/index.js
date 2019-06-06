var express = require('express');
var router = express.Router();

/* GET home page. */
var Product = require('../models/products');

router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productchuncks = [];
    var chuncks = 3;
    for(var i=0; i<docs.length; i+=chuncks){
      productchuncks.push(docs.slice(i, i+chuncks));
    }
    res.render('restaurant/restaurant', { title: 'Shopping Cart', product: productchuncks });
  });
  
});
module.exports = router;
