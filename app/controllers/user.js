var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var User = mongoose.model('User');
var ObjectId = mongoose.Schema.ObjectId;

exports.Changeavatar = function (email,avatar, callback) {
  User.update({email:email},{avatar:avatar}).exec(function(err, data){
    if(err){
      callback("Error");
    }
    else{
      callback(null, data);
    }
  });
};

exports.editUser = function(user, newData, callback)
{
	User.findOne({'id': ObjectId(newData.id)}, function(e, o){
		if(e)
			res.status(400).send('error');
		else{
			user.fullname = newData.fullname;
			user.email = newData.email;
			user.password = newData.newpassword;

			user.save(function(e) {
				if (e) callback(e);
				else callback(null, user);
			});
		}
	});
}
