var Product = require('../models/products');

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Restaurant", { useNewUrlParser: true });

var products = [
    new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/48/India_food.jpg',
    title: 'Biryani',
    price: 122
    }),
    new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Chicken_Chili_HR2.jpg/200px-Chicken_Chili_HR2.jpg',
    title: 'Chichen Chili',
    price: 250
    }),
    new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/48/India_food.jpg',
    title: 'Biryani',
    price: 122
    }),
    new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/48/India_food.jpg',
    title: 'Biryani',
    price: 122
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Chicken_Chili_HR2.jpg/200px-Chicken_Chili_HR2.jpg',
        title: 'Chichen Chili',
        price: 250
        }),
        new Product({
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Chicken_Chili_HR2.jpg/200px-Chicken_Chili_HR2.jpg',
            title: 'Chichen Chili',
            price: 250
            }),    
         
];

var done = 0;
for (var i=0;i<products.length;i++)
{
    products[i].save(function(err, result){
        done++;
        if(done == products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}