'use strict';

import { RecLetter } from '../../classes/recletter';

export default class RecDashController {
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
    this.$http.get('http://localhost:3000/api/RecommendationLetterRequests')
      .then(function(response) {
        console.log(response.data);
        $scope.pendingRecs = response.data.pending;
        $scope.submittedRecs = response.data.created;
      });
  }
}
