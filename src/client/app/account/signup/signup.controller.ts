'use strict';
// @flow
const angular = require('angular');

interface User {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  recommenderPositionTitle: string;
  schoolContactName: string;
  schoolContactNumber: string;
  password: string;
}

export default class SignupController {
  user: User = {
    name: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    recommenderPositionTitle: '',
    schoolContactName: '',
    schoolContactNumber: '',
    password: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;
  $http;
  $uibModal;
  $uibModalStack;

  /*@ngInject*/
  constructor(Auth, $state, $http, $uibModal, $uibModalStack) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.$uibModalStack = $uibModalStack;
  }

  register(form, userRole) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        addressLine1: this.user.addressLine1,
        addressLine2: this.user.addressLine2,
        city: this.user.city,
        state: this.user.state,
        zip: this.user.zip,
        recommenderPositionTitle: this.user.recommenderPositionTitle,
        schoolContactName: this.user.schoolContactName,
        schoolContactNumber: this.user.schoolContactNumber,
        role: userRole,
        password: this.user.password
      })
      .then(() => {
        console.log('user created1');
        this.emailRegistrationConfirmation();  
        console.log('user created2');
        // Account created, redirect to home
        //this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};
        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });

      });
    }
  }

  openEmailModalPopup() {
    console.log('Entering openEmailModalPopup()..');
    var $modalInstance = this.$uibModal.open({
    template: require('./emailRegistrationConfirmation.html'),
    controller: 'SignupController',
    controllerAs: 'vm',
    });
  }

  closeEmailModalPopup() {
    console.log("Entering closeEmailModalPopup()..");
    this.$uibModalStack.dismissAll();
    this.$state.go('main');
  }

  emailRegistrationConfirmation() {
    console.log("Entering emailRegistrationConfirmation()..");

    let registrationConfirmationEmailRequest = {
      name: this.user.name,
      email: this.user.email
    };

    const success = response => {
      this.openEmailModalPopup();
    };
    const diplayError = error => {
      console.log(error);
      this.$state.go('main');
    };

    this.$http.post('http://localhost:3000/api/emailRegistrationConfirmation', registrationConfirmationEmailRequest)
      .then(success, diplayError);

  }
}
