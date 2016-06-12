angular.module('App', []).controller('control', ['$scope', function($scope){
  $scope.addOrder = function(object, id){
    var order = {
      idorder: id,
      item:object,
      receiver:{
        address: $scope.adrees,
        email:$scope.email,
        name:$scope.name,
        phone:$scope.phone
      }
    };
    console.log(order);
    $.ajax({
			type: 'POST',
			data: order,
      url: '/cart',
      success: function(data) {
        window.alert("Your order has been submitted\nWe'll contact you ASAP to delivery your order");
      }
  });
  }
  $scope.removeItem = function(id, email){
    var remove={
      id:id,
      email:email
    };
    $.ajax({
			type: 'POST',
			data: remove,
      url: '/cart',
      success: function(data) {
        window.alert("Your order has been deleted success");
        location.reload();
      }
  });
  }
}]);
