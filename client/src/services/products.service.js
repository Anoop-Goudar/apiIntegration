(function () {
  'use strict';

    angular
      .module('app')
      .factory('ProductsService', ProductsService);

    ProductsService.$inject = ['$http'];

    function ProductsService($http) {
      var svc = {};
      svc.getProducts = getProducts;

      return svc;

      // //////////

      function getProducts(access_token) {
        var auth = {};
        auth.access_token = access_token;
        return $http.post('/api/v1/products', auth).then(successHandler, errorHandler);
      }

      function successHandler(response) {
        return response;
      }

      function errorHandler(error) {
        console.log(error);
      }
    }
}());
