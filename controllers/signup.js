var User = require('../models/user');
var mongoose = require('mongoose');

exports.signup = function(req, res, next){

    mongoose.connect("mongodb://localhost:27017/Restaurant", { useNewUrlParser: true });

    User.findOne({ $or: [{email: req.body.email},{phone: req.body.phone}] }, function(err, user){
        if(user)
        {
            res.send('User exist');
        }
        
        else{
            var newuser = User();
            newuser.name = req.body.name;
            newuser.email = req.body.email;
            newuser.phone = req.body.phone;
            newuser.password = newuser.encryptPassword(req.body.password);

            
            newuser.save();

            res.redirect('/');
        }
    });
    

    
};


