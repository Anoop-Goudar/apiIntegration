(function () {
  'use strict';

    angular
      .module('app')
      .factory('LoggedinUserService', LoggedinUserService);

    LoggedinUserService.$inject = ['$http'];

    function LoggedinUserService($http) {
      var loggedUser = {}
      function set(data) {
        loggedUser = data;
      }
      function get() {
       return loggedUser;
      }

      return {
       set: set,
       get: get
      }

    }
}());

//
// app.factory('myService', function() {
//   var savedData = {}
//   function set(data) {
//     savedData = data;
//   }
//   function get() {
//    return savedData;
//   }
//
//   return {
//    set: set,
//    get: get
//   }
//
// });
