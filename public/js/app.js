/*global angular, turnOffLogin, turnOffCreate*/
// Declare app level module which depends on views, and components
var app = angular.module('App', []);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

app.controller("IndexCtrl", function ($scope, $firebaseObject, $firebaseAuth, Auth, $anchorScroll, Ref) {
    'use strict';

    Auth.$onAuth(function (authData) {
        $scope.authData = authData;

        if (authData) {
            $scope.quantity = $firebaseObject(Ref.child("user/" + authData.uid + "/quantity"));
            $scope.quantity.$loaded().then(function () {
                if (!$scope.quantity.$value) {
                    $scope.quantity.$value = 0;
                    $scope.quantity.$save();
                }
            });

            switch (authData.provider) {
            case "facebook":
                $scope.userName = $scope.authData.facebook.displayName;
                break;
            case "google":
                $scope.userName = $scope.authData.google.displayName;
                break;
            case "twitter":
                $scope.userName = $scope.authData.twitter.displayName;
                break;
            case "password":
                var userName = $firebaseObject(Ref.child("user/" + authData.uid + "/name"));
                userName.$loaded().then(function () {
                    $scope.userName = userName.$value;
                });
                break;
            }
        }
    });

    $scope.loginEmail = function () {
        Auth.$authWithPassword($scope.credential).then(function () {
            turnOffLogin();
        })["catch"](function (error) {
            window.alert("Invalid info");
        });
    };

    $scope.loginFacebook = function () {
        Auth.$authWithOAuthPopup("facebook");
    };

    $scope.loginGoogle = function () {
        Auth.$authWithOAuthPopup("google");
    };

    $scope.loginTwitter = function () {
        Auth.$authWithOAuthPopup("twitter");
    };

    $scope.logout = function () {
        Auth.$unauth();
    };

    $scope.createUser = function () {
        if ($scope.createData.password !== $scope.createData.confirm) {
            window.alert("Password not match");
        } else {
            Auth.$createUser($scope.createData).then(function (authData) {
                var userName = $firebaseObject(Ref.child("user/" + authData.uid + "/name"));
                userName.$value = $scope.createData.name;
                userName.$save();
                turnOffCreate();
            })["catch"](function (error) {
                window.alert("Error");
            });
        }
    };

    $scope.scrollToTop = function () {
        $anchorScroll("topwebsite");
    };
});


(document).ready(function($){
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.toTop');

    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) { 
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

});