var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var orders = mongoose.model('orders');

exports.ListOrder = function (email, callback) {
  orders.find({'id':email}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};
