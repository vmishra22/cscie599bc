'use strict';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
      .state('create', {
        url: '/recletters/create',
        template: require('./create/createrecletter.html'),
        controller: 'CreateRecLetterController',
        controllerAs: 'vm'
      })
      .state('list', {
        url: '/recletters/list',
        template: require('./list/recletterslist.html'),
        controller: 'RecLettersListController',
        controllerAs: 'vm'
      })
      .state('view', {
        url: '/recletters/view/:id',
        template: require('./view/viewrecletter.html'),
        controller: 'ViewRecLetterController',
        controllerAs: 'vm'
      });
}
