'use strict';

import { CandidateQuestion } from '../../classes/candidatequestion';
import { QuestionResponse } from '../../classes/questionresponse';
import { RecLetter } from '../../classes/recletter';


export default class CreateRecLetterController {

  $http;
  $location;
  filesToUpload: Array<File>;
  candidateQuestions: CandidateQuestion[];
  questionResponses: QuestionResponse[] = [];
  fileInput: any;
 

  /*@ngInject*/
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
  }

  $onInit() {
    this.getCandidateQuestions(this);
   }

 

  fileSelectionEvent(fileInput: any) {
    console.log("Entering fileSelectionEvent()..");
    this.fileInput = fileInput;
  } 

  radioButtonQuestionResponseEvent(radioButtonQuestionResponse: any) {
    console.log("Entering radioButtonQuestionResponseEvent()..");

    var selectedQuestionText = radioButtonQuestionResponse.target.name;
    var selectedQuestionResponse = radioButtonQuestionResponse.target.value;

    var resopnseModified = false;
    for(var i=0; i<this.questionResponses.length; i++){
      if(this.questionResponses[i].questionText == selectedQuestionText){
        this.questionResponses[i].questionResponse = selectedQuestionResponse;
        resopnseModified = true;
      }
    }

    if(!resopnseModified)
    {
      var questionResponse = {
        questionText: selectedQuestionText,
        questionResponse: selectedQuestionResponse
      }

      this.questionResponses.push(questionResponse);
    }
  }

  submitRecLetter() {
    console.log("Entering submitRecLetter()..");

    this.filesToUpload = this.fileInput.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.filesToUpload[0]);
      reader.onload = () => {

        var newRecLetter = {
          recLetterContents: reader.result,
          candidateQuestions: this.questionResponses
        };

        this.postRecLetter(newRecLetter);

      };

      this.$location.path('/recletters/list');
}
  

  postRecLetter(newRecLetter) {
    console.log("Entering submitRecLetter()..");
    this.$http.post('http://localhost:3000/api/RecommendationLetter', newRecLetter)
      .then(function(response){});
  }

  getCandidateQuestions($scope) {
    console.log("Entering getCandidateQuestions()..");
    this.$http.get('http://localhost:3000/api/CandidateQuestions')
      .then(function(response) {
        $scope.candidateQuestions = response.data;
      });
  }

}
