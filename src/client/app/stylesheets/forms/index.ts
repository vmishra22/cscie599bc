'use strict';
const angular = require('angular');
import StylesheetsController from '../stylesheets.controller';

export default angular.module('recLettersApp.stylesheets.forms', [])
  .controller('StylesheetsController', StylesheetsController)
  .name;
