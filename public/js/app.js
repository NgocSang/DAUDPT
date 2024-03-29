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
