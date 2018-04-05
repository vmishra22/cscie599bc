'use strict';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
      .state('create', {
        url: '/recletters/create',
        template: require('./create/createrecletter.html'),
        controller: 'CreateRecLetterController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('list', {
        url: '/recletters/list',
        template: require('./list/recletterslist.html'),
        controller: 'RecLettersListController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('view', {
        url: '/recletters/view/:id',
        template: require('./view/viewrecletter.html'),
        controller: 'ViewRecLetterController',
        controllerAs: 'vm',
        authenticate: true
      });
}
