'use strict';

export default class EthController {
  $http;

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/samples/eth').then(response => {
      console.log(response);
      //this.awesomeThings = response.data;
    });
  }
}
