'use strict';
const angular = require('angular');
import MongoController from './mongo.controller';

export default angular.module('recLettersApp.mongo', [])
  .controller('MongoController', MongoController)
  .name;
