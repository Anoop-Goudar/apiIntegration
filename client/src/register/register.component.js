(() => {
  angular.module('app')
  .component('register', {
    templateUrl: 'register/register.html',
    controller: RegisterController,
    controllerAs: 'vm'
  });

  RegisterController.$inject = ['$rootScope', '$location', 'RegisterService'];

  function RegisterController($rootScope, $location, RegisterService) {
    const vm = this;
    vm.user = {};
    vm.register = register;

    function register() {
      RegisterService.registerUser(vm.user);
    }
  }
})();
