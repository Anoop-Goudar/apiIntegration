'use strict';

(() => {
  angular.module('app')
  .component('products', {
    templateUrl: 'products/products.html',
    controller: ProductsController,
    controllerAs: 'vm'
  });

  ProductsController.$inject = ['LoggedinUserService', 'ProductsService'];

  function ProductsController(LoggedinUserService, ProductsService) {
    var vm = this;
    vm.user = {};
    vm.products = {};
    vm.user = LoggedinUserService.get();
    ProductsService.getProducts(vm.user.access_token).then(successHandler);

    function successHandler(response) {
      var data = response.data.split('data":')[1];
      vm.products = data.slice(0, data.length-1);
      vm.products = JSON.parse(vm.products);
    }

  }
})();
