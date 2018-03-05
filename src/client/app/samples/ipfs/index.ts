'use strict';
const angular = require('angular');
import IpfsController from './ipfs.controller';

export default angular.module('recLettersApp.login', [])
  .controller('IpfsController', IpfsController)
  .name;
