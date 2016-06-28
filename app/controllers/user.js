var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/DAUDPT');
mongoose.connect('mongodb://sang:123456789@ds013574.mlab.com:13574/doanudpt');
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
