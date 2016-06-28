var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var orders = mongoose.model('reviews');

exports.Listreview = function (productID, callback) {
  orders.find({'productID':productID}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};

exports.Findreview = function (productID, callback) {
  orders.findOne({'productID':productID}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};

exports.UdateAddreview = function (productID,reviewed, callback) {
  orders.update({productID:productID},{$push:{comment:reviewed}}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};

exports.Newreview = function (productID,reviewed, callback) {
  var reviweproduct = new review({productID:productID, comment:reviewed });
  reviweproduct.save(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};
