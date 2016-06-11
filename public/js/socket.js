var socket = io();
var userId = (new Date()).getTime();
//var userId = 123456789011;
var userNickname = '';

$(window).on('beforeunload', function(){
  //console.log('Closed');
    socket.close();
});

function getCurrentTime() {
	var d = new Date();
	return res = d.getHours() + ':' + d.getMinutes()
}

function getMessageHTML(data, right) {
	var name = data.username;
	var msg = data.msg;
	var floatavatar = right ? 'media-right' : 'media-left';
  var float = right ? 'speech-right' : '';
	// var html = 	'<li class="mar-btm"><div class="media-'+ floatVal + '">' +
	// 			'<img src="http://bootdey.com/img/Content/avatar/avatar1.png" class="img-circle img-sm" alt="Profile Picture"></div>' +
	// 			'<div class="media-body pad-hor speech-'+ floatVal + '"><div class="speech">' +
	// 			'<a href="#" class="media-heading">' + name + '</a><p>' + msg + '</p>' +
	// 			'<p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>' + getCurrentTime() + '</p></div></div></li>';

  var html = '<li class="mar-btm"> <div class="'+floatavatar+'"><img src="http://bootdey.com/img/Content/avatar/avatar2.png" class="img-circle img-sm" alt="Profile Picture"></div></div><div class="media-body pad-hor '+float+'"><div class="speech"><a href="#" class="media-heading">'+data.userNickname+'</a><p>'+data.msg+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>' + getCurrentTime() + '</p></div></div></li>'
  return html;
  }
function insertMessage(data) {
	var html = getMessageHTML(data, (data.userId == userId));
	$('#list').append(html);

}

function init() {
  $('#m').on('keypress', function(key) {
    if (key.which === 13) {
      $('#btn-send').click();
    }
  });

  $('#btn-send').click(function() {
    var msgJSON = JSON.parse('{"msg": "' + $('#m').val() + '"}');
    socket.emit('chat message', msgJSON);
    $('#m').val('');
    return false;
  });

  userNickname = $('#ten').html();
  if (userNickname.trim() === '') {
    document.write('');
    return;
  } else {
    var msgJSON = JSON.parse('{"userId": "' + userId + '", "userNickname": "' + userNickname + '"}');
    socket.emit('user info', msgJSON);
  }
}

$(document).ready(function() {
  init();

  socket.on('chat message', function(message) {
        insertMessage(message);
  });
});
