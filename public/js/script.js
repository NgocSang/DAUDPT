/*var imgCtrl;

var app = angular.module("app", []);

app.controller("imgCtrl1", function ($scope) {
    imgCtrl = $scope;
});
*/
function Ham(avatar, email){
  var infor = {
    email:email,
    avatar:avatar
  };

  $.ajax({
    type: 'POST',
    data: infor,
    url: '/',
    success: function(data) {
      window.alert('Chang avatar success');
    }
});
}
