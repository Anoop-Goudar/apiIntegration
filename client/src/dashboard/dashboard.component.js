'use strict';

(() => {
  angular.module('app')
  .component('dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: DashboardController,
    controllerAs: 'vm'
  });

  DashboardController.$inject = ['LoggedinUserService'];

  function DashboardController(LoggedinUserService) {
    var vm = this;
    vm.user = LoggedinUserService.get();
  }
})();
