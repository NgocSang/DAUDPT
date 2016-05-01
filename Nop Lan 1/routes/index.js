var express = require('express');
var router = express.Router();
//var AM = require('./modules/account-manager');

/* GET home page. */
module.exports = function(app){
app.get('/', function(req, res) {
  res.render('home');
});
}
