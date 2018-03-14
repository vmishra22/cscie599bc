'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require('angular');
var eth_controller_1 = require("./eth.controller");
exports.default = angular.module('recLettersApp.eth', [])
    .controller('EthController', eth_controller_1.default)
    .name;
