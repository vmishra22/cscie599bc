'use strict';
const angular = require('angular');
import AddDegreeProgramController from './add-degree-program.controller';

export default angular.module('recLettersApp.addDegreeProgram', [])
  .controller('AddDegreeProgramController', AddDegreeProgramController)
  .name;
