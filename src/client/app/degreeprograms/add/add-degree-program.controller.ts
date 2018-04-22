'use strict';
// @flow
const angular = require('angular');

interface CandidateQuestion {
  questionText: string;
  responseChoices: string[];
  selected: boolean;
}
interface ProgramCandidateQuestion {
  questionText: string;
  responseChoices: string[];
}
interface DegreeProgram {
  schoolId: string;
  schoolName: string;
  programName: string;
  programCandidateQuestions: ProgramCandidateQuestion[];
}

export default class AddDegreeProgramController {
  degreeProgram: DegreeProgram = {
    schoolId: '',
    schoolName: '',
    programName: '',
    programCandidateQuestions: []
  };
  errors = {};
  submitted = false;
  $state;
  $http;
  Auth;
  currentUser;
  candidateQuestions: CandidateQuestion[];
  $scope = this;
  $location;
  errorText: string;

  /*@ngInject*/
  constructor(Auth, $http, $state, $location) {
    this.Auth = Auth;
    this.$http = $http;
    this.$location = $location;
    this.getCurrentUser(this);
    this.getCandidateQuestions(this);
  }

  addDegreeProgram(form) {
    this.submitted = true;

    if(form.$valid) {

      if(this.currentUser) {
        if (this.currentUser.role === 'school') {
          let newDegreeProgram = {
            schoolId: this.currentUser._id,
            schoolName: this.currentUser.name,
            programName: this.degreeProgram.programName,
            candidateQuestions: []
          };

          for(var i=0; i<this.candidateQuestions.length; i++) {
            if(this.candidateQuestions[i].selected) {
              newDegreeProgram.candidateQuestions.push(this.candidateQuestions[i]);
            }
          }

          const redirect = response => this.$location.path('/school-dashboard');
          const diplayError = error => {
            console.log(error);
            this.errorText = 'An error occurred: ' + JSON.stringify(error.data.error);
          };

          this.$http.post('http://localhost:3000/api/DegreeProgram', newDegreeProgram)
            .then(redirect, diplayError);


        }
      }

    }
  }

  createDegreeProgramObject($scope) {
    this.Auth.getCurrentUser()
    .then(function(currentUser) {
      console.log('currentUser', currentUser);
      console.log('currentUser.email', currentUser.email);
      console.log('currentUser.name', currentUser.name);
      console.log('currentUser.role', currentUser.role);
      console.log('currentUser.id', currentUser._id);
      $scope.currentUser = currentUser;

      if(currentUser) {
        if (currentUser.role === 'student') {
          let newDegreeProgram = {
            schoolId: currentUser._id,
            schoolName: currentUser.name,
            programName: $scope.degreeProgram.programName,
            candidateQuestions: []
          };
          console.log('old program = '+$scope.degreeProgram);
          console.log('new program = '+newDegreeProgram.schoolName);
        }
      }
    });
  }

  getCurrentUser($scope) {
    console.log('Entering getCurrentUser()..');
    this.Auth.getCurrentUser()
    .then(function(currentUser) {
      $scope.currentUser = currentUser;
    });
  }

  getCandidateQuestions($scope) {
    console.log('Entering getCandidateQuestions()..');
    this.$http.get('http://localhost:3000/api/CandidateQuestions')
      .then(function(response) {
        $scope.candidateQuestions = response.data;
      });
  }

}
