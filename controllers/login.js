var User = require('../models/user');
var mongoose = require('mongoose');

exports.login = function(req, res, next){
    mongoose.connect("mongodb://localhost:27017/Restaurant", { useNewUrlParser: true });

    User.findOne({ $or: [{email: req.body.email},{phone: req.body.phone}] }, function(err, user){

     
    if(!user)
    {
        res.send('User Does not exist');
    }
    else if(!user.validPassword(req.body.password))
    {
        res.send('Wrong Password');
    }
    else if(req.body.email === 'carbonix72@gmail.com')
    {
        res.send('Hello Admin');
    }
    else
    res.redirect('/');

    });

};