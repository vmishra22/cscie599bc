'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');



const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
import 'angular-validation-match';



import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import samples from './samples';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import recletters from './recletters';

import './app.scss';

angular.module('recLettersApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  uiRouter,
  uiBootstrap,
  _Auth,
  account,
  admin,
  samples,
  'validation.match',
  navbar,
  footer,
  main,
  constants,
  util,
  recletters
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['recLettersApp'], {
      strictDi: true
    });
  });
