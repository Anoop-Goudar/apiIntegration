(function () {
  'use strict';

    angular
      .module('app')
      .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$http'];

    function RegisterService($http) {
      var svc = {};
      svc.registerUser = registerUser;

      return svc;

      // //////////

      function registerUser(user) {
        return $http.post('/api/v1/user/register', user).then(successHandler, errorHandler);
      }

      function successHandler(response) {
        console.log(response);
        return response.data;
      }

      function errorHandler(error) {
        console.log(error);
      }
    }
}());
