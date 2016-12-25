(() => {
  angular.module('app')
  .component('register', {
    templateUrl: 'register/register.html',
    controller: RegisterController,
    controllerAs: 'vm'
  });

  RegisterController.$inject = ['$rootScope', '$location'];

  function RegisterController($rootScope, $location) {
    const vm = this;
  }
})();
