'use strict';
const angular = require('angular');
import ViewRecLetterController from './viewrecletter.controller';

export default angular.module('recLettersApp.viewrecletter', [])
  .controller('ViewRecLetterController', ViewRecLetterController)
  .name;
