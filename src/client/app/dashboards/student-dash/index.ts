'use strict';
const angular = require('angular');
import StudentDashController from './student-dash.controller';

export default angular.module('recLettersApp.student_dashboard', [])
  .controller('StudentDashController', StudentDashController)
  .name;
