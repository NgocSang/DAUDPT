var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/DAUDPT');
mongoose.connect('mongodb://sang:123456789@ds013574.mlab.com:13574/doanudpt');
var db = mongoose.connection;
var review = mongoose.model('reviews');

exports.Listreview = function (productID, callback) {
  review.find({'productID':productID}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};

exports.Findreview = function (productID, callback) {
  review.findOne({'productID':productID}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};

exports.UdateAddreview = function (productID,reviewed, callback) {
  review.update({productID:productID},{$push:{comment:reviewed}}).exec(function(err, data){
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
