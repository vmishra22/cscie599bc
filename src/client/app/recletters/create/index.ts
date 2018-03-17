'use strict';
const angular = require('angular');
import CreateRecLetterController from './createrecletter.controller';

export default angular.module('recLettersApp.createrecletter', [])
  .controller('CreateRecLetterController', CreateRecLetterController)
  .name;
