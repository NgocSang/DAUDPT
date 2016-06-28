
/*!
 * Module dependencies.
 */
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/DAUDPT');
 var db = mongoose.connection;
 var product = mongoose.model('products');



 exports.loadtrueproduct = function (callback) {
   product.find({'featured':'true'}).exec(function(err, data){
     if(err){
         callback('Error');
     }
     else
     {
       callback(null, data);
     }
   });
 };

 exports.loadproduct = function (callback) {
   product.find({}).exec(function(err, data){
     if(err){
         callback('Error');
     }
     else
     {
       callback(null, data);
     }
   });
 };

 exports.Searchproduct = function (query,callback) {
   console.log(query);
   
   product.find(query).exec(function(err, data){
     if(err){
         callback('Error');
     }
     else
     {
       console.log('----------------------------asdsad-------------------------------');
       console.log(data);
       callback(null, data);
     }
   });
 };

 exports.findproduct = function (productID,callback) {
   product.find({'productID':productID}).exec(function(err, data){
     if(err){
         callback('Error');
     }
     else
     {
       callback(null, data);
     }
   });
 };
