'use strict';

export default class SchoolDashController {
  $http;
  $location;
  students;

  /*@ngInject*/
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
  }

  $onInit() {
    this.setStudents(this);
  }

  setStudents($scope) {
    this.$http.get('http://localhost:3000/api/users')
      .then(function(response) {
        $scope.students = response.data;
      });
  }
}
