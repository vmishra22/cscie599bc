'use strict';
const angular = require('angular');
import SchoolDashController from './school-dash.controller';

export default angular.module('recLettersApp.school_dashboard', [])
  .controller('SchoolDashController', SchoolDashController)
  .name;
