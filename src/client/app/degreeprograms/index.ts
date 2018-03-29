'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import add from './add';
import update from './update';
import routing from './degreeprograms.routes';

export default angular.module('recLettersApp.degreeprograms', [
  uiRouter,
  add,
  update
  ])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    });
  })
  .name;
