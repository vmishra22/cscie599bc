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

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
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
        // Account created, redirect to home
                this.$state.go('main');      })
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
}
