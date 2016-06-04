var login = require('../config/routes');
var mang = [];
module.exports = function (app, io) {
  function pushmang(mang, data){
    var check = mang.indexOf(data);
    if(check == -1)
    {
      mang.push(data);

    }
  }
io.on('connection', function(socket) {
  //console.log('A user connected');
  socket.on('user info', function(data) {
    socket.userId = data.userId;
    if (data.userNickname == socket.userNickname) {
      return;
    }
    console.log("socket");
    console.log(user);
    var welcomeMsg = (!socket.userNickname) ? data.userNickname + ' is online' : socket.userNickname + ' renamed to ' + data.userNickname;
    socket.userNickname = data.userNickname;
    if(socket.userNickname != "admin")
    {
      pushmang(mang,socket.userNickname);
    }

    io.emit('name message', welcomeMsg);
    if (socket.userNickname == 'admin' || socket.userNickname == mang[0]) {
      socket.join('room1');
    }
  });

  socket.on('chat message', function(data) {
    //console.log('msg: ' + JSON.toString(data));
    data.userId = socket.userId;
    data.userNickname = socket.userNickname;

    if (socket.userNickname == 'admin' || socket.userNickname == mang[0]) {
      io.in('room1').emit('chat message', data);
      return;
    }
  });

  /*socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
   });*/
});

}
