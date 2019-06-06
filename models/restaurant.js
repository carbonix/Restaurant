var mongoose = require('mongoose');
var schema = mongoose.Schema;

var restaurant = new schema({
    image: {type: String, required: true},
    description: {type: String, required: true},
    address: {type: String, required: true}
});

module.exports = mongoose.model('Restaurant', restaurant);