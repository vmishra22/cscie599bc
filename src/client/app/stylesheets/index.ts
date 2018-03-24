'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import widgets from './widgets';
import tables from './tables';
import forms from './forms';

import routing from './stylesheets.routes';

export default angular.module('recLettersApp.stylesheets', [
  uiRouter,
  widgets,
  tables,
  forms
])
  .config(routing)

  .run(function($rootScope) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    });
  })
  .name;
