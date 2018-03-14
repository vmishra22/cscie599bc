"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require('angular');
var uiRouter = require('angular-ui-router');
var main_routes_1 = require("./main.routes");
var MainController = /** @class */ (function () {
    /*@ngInject*/
    function MainController($http) {
        this.awesomeThings = [];
        this.newThing = '';
        this.$http = $http;
    }
    MainController.prototype.$onInit = function () {
        var _this = this;
        this.$http.get('/api/things').then(function (response) {
            _this.awesomeThings = response.data;
        });
    };
    MainController.prototype.addThing = function () {
        if (this.newThing) {
            this.$http.post('/api/things', { name: this.newThing });
            this.newThing = '';
        }
    };
    MainController.prototype.deleteThing = function (thing) {
        this.$http.delete('/api/things/' + thing._id);
    };
    return MainController;
}());
exports.MainController = MainController;
exports.default = angular.module('recLettersApp.main', [
    uiRouter
])
    .config(main_routes_1.default)
    .component('main', {
    template: require('./main.html'),
    controller: MainController
})
    .name;
