var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/DAUDPT');
mongoose.connect('mongodb://sang:123456789@ds013574.mlab.com:13574/doanudpt');
var db = mongoose.connection;
var cart = mongoose.model('carts');
var ObjectID = require('mongodb').ObjectID;

exports.loadproductcart = function (emai,callback) {

  cart.findOne({email:emai}).exec(function(err, listcart){
    if(err){
      callback('Error');
    }
    else{
      callback(null, listcart);
    }
  });
};
exports.Removeproductcart = function (email, callback) {
  cart.remove({email:email}).exec(function(err, data){
    if(err){
      callback('Erorr');
    }
    else{
      callback(null, data);
    }
  });
};

exports.Updateproductcart = function (email,idorder, callback) {
  cart.update({email:email},{$pop:{cart:{_id:ObjectID(idorder)}}}).exec(function(err, data){
    if(err){
      callback('Eror');
    }
    else{
      callback(null, data);
    }
  });
};

exports.UpdateAddproductcart = function (email,carted, callback) {
  cart.update({email:email},{$push:{cart:carted}}).exec(function(err, data){
    if(err){
      callback('Erorr');
    }
    else{
      callback(null, data);
    }
  });
};

exports.Newproductcart = function (email,carted, callback) {
  var cartedproduct = new cart({email:email, cart:carted });
  cartedproduct.save(function(err, data){
    if(err){
      callback('Error');

    }
    else {

      callback(null, data);
    }
  });
};
