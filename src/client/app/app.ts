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
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import shareddataservice from './app.shareddataservice';
import util from '../components/util/util.module';
import recletters from './recletters';
import degreeprograms from './degreeprograms';
import stylesheets from './stylesheets';
import dashboards from './dashboards';
import rec_letter_requests from './rec-letter-request';

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
  'validation.match',
  navbar,
  footer,
  main,
  constants,
  shareddataservice,
  util,
  recletters,
  degreeprograms,
  stylesheets,
  dashboards,
  rec_letter_requests
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
