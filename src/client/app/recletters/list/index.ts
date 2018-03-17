'use strict';
const angular = require('angular');
import RecLettersListController from './recletterslist.controller';

export default angular.module('recLettersApp.recletterslist', [])
  .controller('RecLettersListController', RecLettersListController)
  .name;
