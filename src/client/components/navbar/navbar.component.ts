'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Create Rec Letter',
    'state': 'create'
  },
  {
    'title': 'Mongo Sample',
    'state': 'mongo'
  },
  {
    'title': 'IPFS Sample',
    'state': 'ipfs'
  },
  {
    'title': 'Ethereum Sample',
    'state': 'eth'
  }
];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
