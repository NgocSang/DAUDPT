
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
//var userPlugin = require('mongoose-user');
var bcrypt = require('bcrypt-nodejs');

/**
 * User schema
 */

var UserSchema =  mongoose.Schema({
  userid: {type: String},
  token: {type: String},
  fullname: {type: String},
  email: {type:  String},
  password: {type:String, default: null},
  avatar: {type: String}
});

/**
 * User plugin
 */

UserSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

//UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

});

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */
var User = mongoose.model('User', UserSchema);
module.exports = User;
