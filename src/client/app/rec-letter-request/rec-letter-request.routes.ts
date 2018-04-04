'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('new-request', {
      url: '/recletters-request/new',
      template: require('./new/new.html'),
      controller: 'NewRecLetterRequestsController',
      controllerAs: 'vm'
    });
}
