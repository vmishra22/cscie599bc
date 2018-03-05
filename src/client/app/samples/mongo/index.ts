'use strict';
const angular = require('angular');
import MongoController from './mongo.controller';

export default angular.module('recLettersApp.login', [])
  .controller('MongoController', MongoController)
  .name;
