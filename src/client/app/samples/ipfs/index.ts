'use strict';
const angular = require('angular');
import IpfsController from './ipfs.controller';

export default angular.module('recLettersApp.ipfs', [])
  .controller('IpfsController', IpfsController)
  .name;
