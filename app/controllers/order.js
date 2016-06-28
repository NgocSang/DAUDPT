var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/DAUDPT');
mongoose.connect('mongodb://sang:123456789@ds013574.mlab.com:13574/doanudpt');
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
