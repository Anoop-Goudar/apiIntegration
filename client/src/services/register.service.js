(function () {
  'use strict';

    angular
      .module('app')
      .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$http'];

    function RegisterService($http) {
      var svc = {};
      svc.registerUser = registerUser;
      svc.loginUser = loginUser;

      return svc;

      // //////////

      function registerUser(user) {
        return $http.post('/api/v1/user/register', user).then(successHandler, errorHandler);
      }

      function loginUser(user) {
        return $http.post('/api/v1/user/login', user).then(successHandler, errorHandler);
      }

      function successHandler(response) {
        return response.data;
      }

      function errorHandler(error) {
        console.log(error);
      }
    }
}());
