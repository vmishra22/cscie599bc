'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import eth from './eth';
import ipfs from './ipfs';
import mongo from './mongo';
import routing from './samples.routes'

export default angular.module('recLettersApp.samples', [
    uiRouter,
    eth,
    ipfs,
    mongo
])
    .config(routing)

    .run(function($rootScope) {
      'ngInject';
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      });
    })
    .name;
