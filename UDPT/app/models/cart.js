var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
	email: {type: String},
  cart:[{
    color : {type: String},
    imgUrl : {type: String},
    name : {type: String},
    number : {type: Number},
    price : {type: Number},
    size : {type: String}
  }]

});

var Cart = mongoose.model('carts', cartSchema);
module.exports = Cart ;
