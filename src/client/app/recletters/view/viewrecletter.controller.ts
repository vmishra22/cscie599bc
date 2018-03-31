'use strict';

export default class ViewRecLetterController {
  $http;
  text: String = "placeholer text...";
  $stateParams;

  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.getRecLetter();
   }

  getRecLetter() {
    const id = this.$stateParams.id;

    if(!id) {
      this.text = "No id given..."
    }
    else {
      this.$http.get(`http://localhost:3000/api/RecommendationLetter/${id}`)
        .then(resp => this.text = JSON.stringify(resp))
    }
  }

}