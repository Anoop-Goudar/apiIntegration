'use strict';

(function () {
  angular.module('app', ['ngRoute']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/dashboard', {
      template: '<dashboard></dashboard>'
    }).when('/register', {
      template: '<register></register>'
    }).otherwise({
      redirectTo: '/dashboard'
    });
  }]);
})();
'use strict';

(function () {
  angular.module('app').component('dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: DashboardController,
    controllerAs: 'vm'
  });

  DashboardController.$inject = [];

  function DashboardController() {
    var vm = this;
  }
})();
'use strict';

(function () {
  angular.module('app').component('appHeader', {
    templateUrl: 'header/header.html',
    controller: HeaderController,
    controllerAs: 'vm'
  });

  HeaderController.$inject = ['$rootScope', '$location'];

  function HeaderController($rootScope, $location) {
    var vm = this;
    vm.menu = $location.path().slice(1);

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      vm.menu = $location.path().slice(1);
    });
  }
})();
'use strict';

(function () {
  angular.module('app').component('register', {
    templateUrl: 'register/register.html',
    controller: RegisterController,
    controllerAs: 'vm'
  });

  RegisterController.$inject = ['$rootScope', '$location'];

  function RegisterController($rootScope, $location) {
    var vm = this;
  }
})();