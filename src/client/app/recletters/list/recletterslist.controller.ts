'use strict';

import { RecLetter } from '../../classes/recletter';

export default class RecLettersListController {

  $http;
  $location;
  recLetters: RecLetter[];


  /*@ngInject*/
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
  }


  $onInit() {
    this.getRecLetters(this);
   }

  getRecLetters($scope) {
    console.log('Entering getRecLetters()..');
    this.$http.get('http://localhost:3000/api/RecommendationLetters')
      .then(function(response) {
        $scope.recLetters = response.data;
      });
  }


}
