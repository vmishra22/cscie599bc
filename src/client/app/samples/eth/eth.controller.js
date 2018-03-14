'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var EthController = /** @class */ (function () {
    /*@ngInject*/
    function EthController($http) {
        this.$http = $http;
    }
    EthController.prototype.$onInit = function () {
        this.$http.get('/api/samples/eth').then(function (response) {
            console.log(response);
            //this.awesomeThings = response.data;
        });
    };
    return EthController;
}());
exports.default = EthController;
