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

  DashboardController.$inject = ['LoggedinUserService'];

  function DashboardController(LoggedinUserService) {
    var vm = this;
    vm.user = LoggedinUserService.get();
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

  RegisterController.$inject = ['$rootScope', '$location', 'RegisterService', 'LoggedinUserService'];

  function RegisterController($rootScope, $location, RegisterService, LoggedinUserService) {
    var vm = this;
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
'use strict';

(function () {
  'use strict';

  angular.module('app').factory('LoggedinUserService', LoggedinUserService);

  LoggedinUserService.$inject = ['$http'];

  function LoggedinUserService($http) {
    var loggedUser = {};
    function set(data) {
      loggedUser = data;
    }
    function get() {
      return loggedUser;
    }

    return {
      set: set,
      get: get
    };
  }
})();

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
'use strict';

(function () {
  'use strict';

  angular.module('app').factory('RegisterService', RegisterService);

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
      console.log(response);
      return response.data;
    }

    function errorHandler(error) {
      console.log(error);
    }
  }
})();