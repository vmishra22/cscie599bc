'use strict';
const angular = require('angular');
import NewRecLetterRequestsController from './new-rec-letter-requests.controller';

export default angular.module('recLettersApp.rec-letter-request.new', [])
  .controller('NewRecLetterRequestsController', NewRecLetterRequestsController)
  .name;
