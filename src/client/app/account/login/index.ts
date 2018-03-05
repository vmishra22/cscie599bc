'use strict';
const angular = require('angular');
import LoginController from './login.controller';

export default angular.module('recLettersApp.login', [])
  .controller('LoginController', LoginController)
  .name;
