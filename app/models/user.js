
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
//var userPlugin = require('mongoose-user');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var UserSchema = new Schema({
  userid: {type: String},
  token: {type: String},
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, default: null},
  avatar:{type: String},
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

module.exports = mongoose.model('User', UserSchema);
