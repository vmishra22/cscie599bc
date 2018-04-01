'use strict';
const angular = require('angular');
import RecDashController from './rec-dash.controller';

export default angular.module('recLettersApp.recommender_dashboard', [])
  .controller('RecDashController', RecDashController)
  .name;
