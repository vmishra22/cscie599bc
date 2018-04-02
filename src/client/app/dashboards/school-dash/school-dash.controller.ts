'use strict';

export default class SchoolDashController {
  $http;
  $location;
  Auth;
  currentUser;
  students;
  degreePrograms;
  studentSearchName;
  studentsWithRecLetters;

  /*@ngInject*/
  constructor(Auth, $http, $location) {
    this.Auth = Auth;
    this.$http = $http;
    this.$location = $location;
  }

  $onInit() {
    this.setStudents(this);
    this.getCurrentUser(this);
   }


  getCurrentUser($scope) {
    console.log("Entering getCurrentUser()..");
    this.Auth.getCurrentUser()
    .then(function(currentUser) {
      $scope.currentUser = currentUser;
 
      if(currentUser) {
        $scope.$http.get('http://localhost:3000/api/degreeprograms?schoolId='+currentUser._id)
        .then(function(response) {
          $scope.degreePrograms = response.data;
        })
      }

    });
  }
  
  setStudents($scope) {
    this.$http.get('http://localhost:3000/api/users')
      .then(function(response) {
        $scope.students = response.data;
      });
  }

  getStudentsWithRecLetters($scope) {
    console.log("Entering getStudentsWithRecLetters()..");

    this.$http.get('http://localhost:3000/api/StudentsWithRecommendationLetters?studentName='+this.studentSearchName)
    .then(function(response) {
      $scope.studentsWithRecLetters = response.data;
    })
  
  }
}
