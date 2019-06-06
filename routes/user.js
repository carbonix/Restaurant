var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var csrf = require('csurf');
var signupcontroller = require('../controllers/signup');
var logincontroller = require('../controllers/login');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', function(req, res, next) {
    res.render('user/signup', {csrfToken: req.csrfToken()});
});


router.post('/signup', signupcontroller.signup);

router.get('/login', function(req, res, next){
    res.render('user/login', {csrfToken: req.csrfToken()});
});

router.post('/login', logincontroller.login);

module.exports = router;