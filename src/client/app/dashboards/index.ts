'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import student_dashboard from './student-dash';
import school_dashboard from './school-dash';
import recommender_dashboard from './rec-dash';
import routing from './dashboards.routes';

export default angular.module('recLettersApp.samples', [
  uiRouter,
  student_dashboard,
  school_dashboard,
  recommender_dashboard
])
  .config(routing)

  .run(function($rootScope) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    });
  })
  .name;
