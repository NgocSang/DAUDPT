
/**
 * Module dependencies
 */
var path = require('path');
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var http = require('http');
var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);
var server = http.createServer(app);




//socket.io
var io = require('socket.io').listen(server);



app.set('io', io);



app.use(express.static(path.join(__dirname, 'public')));

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);
//socket,io
require('./config/socketio')(app,io);

server.listen(port);
console.log('Express app started on port ' + port);
