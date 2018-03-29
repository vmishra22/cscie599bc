'use strict';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
      .state('add-degree-program', {
        url: '/add-degree-program',
        template: require('./add/add-degree-program.html'),
        controller: 'AddDegreeProgramController',
        controllerAs: 'vm'
      })
      .state('update-degree-program', {
        url: '/update-degree-program',
        template: require('./update/update-degree-program.html'),
        controller: 'UpdateDegreeProgramController',
        controllerAs: 'vm'
      });
}
