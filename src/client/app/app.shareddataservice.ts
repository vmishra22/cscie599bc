'use strict';
const angular = require('angular');

export default angular.module('recLettersApp.shareddataservice', [])
  .service('sharedDataService', function () {
    var sharedData = {}
    function set(data) {
      sharedData = data;
    }
    function get() {
     return sharedData;
    }
   
    return {
     set: set,
     get: get
    }
  })  
  .name;
