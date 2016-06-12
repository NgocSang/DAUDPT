var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
	productID: {type: String},
  comment:[{
    avatar:{type: String},
    content:{type: String},
    name:{type: String},
    rating:{type: Number}
  }]
});

var review = mongoose.model('reviews', reviewSchema);
module.exports = review ;
