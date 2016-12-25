(() => {
  angular.module('app')
  .component('register', {
    templateUrl: 'register/register.html',
    controller: RegisterController,
    controllerAs: 'vm'
  });

  RegisterController.$inject = ['$rootScope', '$location', 'RegisterService', 'LoggedinUserService'];

  function RegisterController($rootScope, $location, RegisterService, LoggedinUserService) {
    const vm = this;
    vm.user = {};
    vm.register = register;
    vm.login = login;

    function register() {
      RegisterService.registerUser(vm.user).then(successHandler);
      vm.user = {};
    }
    function login() {
      RegisterService.loginUser(vm.existingUser).then(successHandler);
    }

    function successHandler(response) {
      LoggedinUserService.set(response);
      $location.path('#!/dashboard');
    }
    // function successfulRegistration() {
    //   LoggedinUserService.set(vm.user);
    //   $location.path('#!/dashboard');
    // }
  }
})();
