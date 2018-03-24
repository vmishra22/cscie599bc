'use strict';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
      .state('login', {
        url: '/login',
        template: require('./login/login.html'),
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          'ngInject';
          var referrer = $state.params.referrer
                        || $state.current.referrer
                        || 'main';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('student-signup', {
        url: '/student-signup',
        template: require('./signup/student-signup.html'),
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('recommender-signup', {
        url: '/recommender-signup',
        template: require('./signup/recommender-signup.html'),
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('school-signup', {
        url: '/school-signup',
        template: require('./signup/school-signup.html'),
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        template: require('./settings/settings.html'),
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
}

