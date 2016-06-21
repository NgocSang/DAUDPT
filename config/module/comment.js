var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DAUDPT');
var review = mongoose.model('reviews');
var reviewproduct = db.model('reviews');
var db = mongoose.connection;

exports.listview = function(productID){
  reviewproduct.find({'productID':productID}).exec(function(err, reviewpro){
    if(err){
      callback('Errors');
    }
    else{
      callback(null,reviewpro);
    }
  });
}
