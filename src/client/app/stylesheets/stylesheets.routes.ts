'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('widgets', {
      url: '/stylesheets/widgets',
      template: require('./widgets/widgets.html'),
      controller: 'StylesheetsController',
      controllerAs: 'vm'
    })
    .state('tables', {
      url: '/stylesheets/tables',
      template: require('./tables/tables.html'),
      controller: 'StylesheetsController',
      controllerAs: 'vm'
    })
    .state('forms', {
      url: '/stylesheets/forms',
      template: require('./forms/forms.html'),
      controller: 'StylesheetsController',
      controllerAs: 'vm'
    });
}
