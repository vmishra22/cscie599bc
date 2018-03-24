'use strict';
const angular = require('angular');
import StylesheetsController from '../stylesheets.controller';

export default angular.module('recLettersApp.stylesheets.tables', [])
  .controller('StylesheetsController', StylesheetsController)
  .name;
