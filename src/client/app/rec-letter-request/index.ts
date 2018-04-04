'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import new_requests from './new';
import routing from './rec-letter-request.routes';

export default angular.module('recLettersApp.recletter-requests', [
  uiRouter,
  new_requests
])
  .config(routing)

  .run(function($rootScope) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    });
  })
  .name;
