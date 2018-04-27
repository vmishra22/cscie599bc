'use strict';

export default class NewRecLetterRequestsController {
  $http;
  $location;
  Auth;
  submitted = false;
  currentUser;
  recommender;
  degreeProgram;
  recommenders;
  degreePrograms;
  errorText: string;
  $uibModal;
  $uibModalStack;
  emailConfirmationMessage;

  recommenderInvitationEmail;
  recommenderInvitationName;

  /*@ngInject*/
  constructor(Auth, $http, $state, $location, $uibModal, $uibModalStack) {
    this.Auth = Auth;
    this.$http = $http;
    this.$location = $location;
    this.setCurrentUser(this);
    this.getDegreePrograms(this);
    this.getRecommenders(this);
    this.$uibModal = $uibModal;
    this.$uibModalStack = $uibModalStack;
    }

  submit(form) {
    this.submitted = true;

    if(form.$valid) {
      let recRequest = {
        studentId: this.currentUser._id,
        studentName: this.currentUser.name,
        recommenderId: this.recommender._id,
        recommenderName: this.recommender.name,
        schoolId: this.degreeProgram.schoolId,
        schoolName: this.degreeProgram.schoolName,
        programName: this.degreeProgram.programName
      };

      const redirect = response => this.$location.path('/student-dashboard');
      const diplayError = error => {
        console.log(error);
        this.errorText = 'An error occurred: ' + JSON.stringify(error.data.error);
      };

      this.$http.post('http://localhost:3000/api/RecommendationLetterRequest', recRequest)
        .then(redirect, diplayError);
    }
  }

  setCurrentUser($scope) {
    this.Auth.getCurrentUser()
      .then(function(user) {
        $scope.currentUser = user;
      });
  }

  getDegreePrograms($scope) {
    this.$http.get('http://localhost:3000/api/DegreePrograms')
      .then(function(response) {
        $scope.degreePrograms = response.data;
      });
  }

  getRecommenders($scope) {
    this.$http.get('http://localhost:3000/api/users', {params: {'userRole': 'recommender'}})
      .then(function(response) {
        $scope.recommenders = response.data;
      });
  }

  openEmailModalPopup() {
    console.log('opening pop up');
    var $modalInstance = this.$uibModal.open({
    template: require('./emailRecommender.html'),
    controller: 'NewRecLetterRequestsController',
    controllerAs: 'vm',
    });
  }

  closeEmailModalPopup() {
    console.log("Entering closeEmailModalPopup()..");
    this.$uibModalStack.dismissAll();
  }

  emailRecommender(form) {
    console.log("Entering emailRecommender()..");

    if(form.$valid) {
      
      let recommenderInvitationEmailRequest = {
        recommenderName: this.recommenderInvitationName,
        recommenderEmail: this.recommenderInvitationEmail,
        studentName: this.currentUser.name,
      };

      const diplaySuccess = response => {
        this.emailConfirmationMessage = 'Email sent to: ' + this.recommenderInvitationEmail;
      };
      const diplayError = error => {
        console.log(error);
        this.emailConfirmationMessage = 'An error occurred: ' + JSON.stringify(error.data);
      };

      this.$http.post('http://localhost:3000/api/emailRecommender', recommenderInvitationEmailRequest)
        .then(diplaySuccess, diplayError);
    }
    else {
      this.emailConfirmationMessage = "Please enter valid input";
      console.log("Not valid..");
    }
  }

}