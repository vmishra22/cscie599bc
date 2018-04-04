'use strict';
// @flow
interface User {
  name: string;
  email: string;
  password: string;
}

export default class LoginController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {login: undefined};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then((user) => {
        if(user) {
          if(user.role === 'student') {
            this.$state.go('student-dash');
          }
          else if(user.role === 'recommender') {
            this.$state.go('rec-dash');
          }
          else if(user.role === 'school') {
            this.$state.go('school-dash');
          }
          else {
            this.$state.go('main');
          }
        }
        else {
          this.$state.go('main');
        }
      })
      .catch(err => {
        this.errors.login = err.message;
      });
    }
  }
}
