
/*!
 * Module dependencies.
 */
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/DAUDPT');
 var db = mongoose.connection;
 var product = mongoose.model('products');



 exports.loadproduct = function (callback) {

   product.find({'featured':'true'}).exec(function(err, data){
     if(err){
         callback('Error');
     }
     else
     {
       callback(null, data);
     }
   });
   callback(null, data);
 };

exports.index = function (callback) {
  callback('A','b');
};
