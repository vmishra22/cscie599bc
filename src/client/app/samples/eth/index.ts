'use strict';
const angular = require('angular');
import EthController from './eth.controller';

export default angular.module('recLettersApp.login', [])
  .controller('EthController', EthController)
  .name;
