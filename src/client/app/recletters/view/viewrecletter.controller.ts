'use strict';

export default class ViewRecLetterController {
  $http;
  $stateParams;
  questionResponses;
  pdfDataAsStr;

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
      console.log('No id given, can\'t display recommendation.');
    } else {
      this.$http.get(`http://localhost:3000/api/RecommendationLetter/${id}`)
        .then(resp => {
          this.questionResponses = resp.data.questionsData;
          this.pdfDataAsStr = resp.data.pdfDataAsStr;
        });
    }
  }
}
