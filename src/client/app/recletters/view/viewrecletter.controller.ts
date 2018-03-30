'use strict';

export default class ViewRecLetterController {
  $http;
  text: String = "placeholer text...";

  /*@ngInject*/
  constructor($http, $location) {
    this.$http = $http;
  }

}