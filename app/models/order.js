var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	id: {type: String},
  item:[{
    color:{type: String},
    imgUrl:{type: String},
    name:{type: String},
    number:{type: Number},
    price:{type: Number},
    size:{type: String}
  }],
  receiver:{
    address: {type: String},
    email:{type: String},
    name:{type: String},
    phone:{type: String}
  }

});

var Order = mongoose.model('orders', orderSchema);
module.exports = Order ;
