'use strict';

(() => {
  angular.module('app', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',($routeProvider, $locationProvider) => {
    $routeProvider
    .when('/dashboard', {
      template: '<dashboard></dashboard>'
    })
    .when('/register', {
      template: '<register></register>'
    })
    .otherwise({
      redirectTo: '/dashboard'
    });
  }]);
})();
