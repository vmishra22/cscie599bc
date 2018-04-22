'use strict';

export default class ViewDegreeProgramController {
  $http;
  $location;
  $stateParams;
  degreeProgram;

  /*@ngInject*/
  constructor($http, $location, $stateParams) {
    this.$http = $http;
    this.$location = $location;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.getDegreeProgram(this);
  }


  getDegreeProgram($scope) {
    console.log('Entering getDegreeProgram()..'+this.$stateParams.programId);

    this.$http.get('http://localhost:3000/api/DegreeProgram/'+this.$stateParams.programId)
    .then(function(response) {
      $scope.degreeProgram = response.data;

      console.log($scope.degreeProgram.programName);
    });

  }
}
