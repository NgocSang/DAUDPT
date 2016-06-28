var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var user = mongoose.model('User');

exports.Changeavatar = function (email,avatar, callback) {
  user.update({email:email},{avatar:avatar}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};
