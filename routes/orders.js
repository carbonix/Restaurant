var express = require('express');
var router = express.Router();
var Order = require('../models/orders')
var Product = require('../models/products');


router.get('/:id',function(req, res, next){
    var productid = req.params.id;
    var order = new Order(req.session.order ? req.session.order : {});

    Product.findById(productid, function(err, product){
    if(err){
        res.redirect('/');
    }
    
    
    order.add(product, product._id);
    req.session.order = order;
    console.log(req.session.order);
    res.redirect('/');
    });
    
});

router.get('/reducebyone/:id',function(req, res, next){
    var productid = req.params.id;
    var cart = new Order(req.session.order ? req.session.order : {});

    cart.reduceby1(productid);
    req.session.order = cart;
    res.redirect('/cart');

});

router.get('/removeall/:id', function(req, res, next){
    var productid = req.params.id;
    var cart = new Order(req.session.order ? req.session.order : {});

    cart.remove(productid);
    req.session.order = cart;
    res.redirect('/cart');
});

router.get('/', function(req, res, next){
   
    if(!req.session.order)
    {
        res.render('restaurant/orders', {products: null});   
    }
    else{
        var cart = new Order(req.session.order);
        res.render('restaurant/orders', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    }

});
module.exports = router;