'use strict';

(function () {
  angular.module('app', ['ngRoute']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/dashboard', {
      template: '<dashboard></dashboard>'
    }).when('/register', {
      template: '<register></register>'
    }).when('/products', {
      template: '<products></products>'
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
  angular.module('app').component('products', {
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
      vm.products = data.slice(0, data.length - 1);
      vm.products = JSON.parse(vm.products);
    }
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

  angular.module('app').factory('ProductsService', ProductsService);

  ProductsService.$inject = ['$http'];

  function ProductsService($http) {
    var svc = {};
    svc.getProducts = getProducts;

    return svc;

    // //////////

    function getProducts(access_token) {
      var auth = {};
      console.log(access_token);
      auth.access_token = access_token;
      return $http.post('/api/v1/products', auth).then(successHandler, errorHandler);
    }

    function successHandler(response) {
      console.log('products are...');
      console.log(response);
      return response;
    }

    function errorHandler(error) {
      console.log(error);
    }
  }
})();
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