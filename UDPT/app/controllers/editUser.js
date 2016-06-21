var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Schema.ObjectId;

module.exports.editUser = function(user, newData, callback)
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