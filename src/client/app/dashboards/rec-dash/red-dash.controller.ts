'use strict';

import { RecLetter } from '../../classes/recletter';

export default class RedDashController {
  $http;
  $location;
  recLetters: RecLetter[];

  /*@ngInject*/
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
  }

  $onInit() {
    this.setRecommendations(this);
  }

  setRecommendations($scope) {
    this.$http.get('http://localhost:3000/api/RecommendationLetters')
      .then(function(response) {
        $scope.pendingRecs = response.data;
        $scope.submittedRecs = response.data;
      });
  }
}
