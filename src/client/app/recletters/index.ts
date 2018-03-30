'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import create from './create';
import list from './list';
import routing from './recletters.routes';
import view from './view'

export default angular.module('recLettersApp.recletters', [
  uiRouter,
  create,
  list,
  view
  ])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    });
  })
  .name;
