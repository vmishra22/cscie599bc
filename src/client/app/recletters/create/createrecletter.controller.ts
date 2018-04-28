'use strict';

import { CandidateQuestion } from '../../classes/candidatequestion';
import { QuestionResponse } from '../../classes/questionresponse';
import { RecLetter } from '../../classes/recletter';


export default class CreateRecLetterController {

  $http;
  $location;
  $stateParams;
  filesToUpload: Array<File>;
  candidateQuestions: CandidateQuestion[];
  questionResponses: QuestionResponse[] = [];
  fileInput: any;
  errorText: string;

  /*@ngInject*/
  constructor($http, $location, $stateParams) {
    this.$http = $http;
    this.$location = $location;
    this.$stateParams = $stateParams;
  }

  $onInit() {
   this.getCandidateQuestions(this);
    this.errorText = null;
   }


   fileSelectionEvent(fileInput: any) {
    console.log('Entering fileSelectionEvent()..');
    this.fileInput = fileInput;
  }

  radioButtonQuestionResponseEvent(radioButtonQuestionResponse: any) {
    console.log('Entering radioButtonQuestionResponseEvent()..');

    var selectedQuestionText = radioButtonQuestionResponse.target.name;
    var selectedQuestionResponse = radioButtonQuestionResponse.target.value;

    var resopnseModified = false;
    for(var i=0; i<this.questionResponses.length; i++) {
      if(this.questionResponses[i].questionText == selectedQuestionText) {
        this.questionResponses[i].questionResponse = selectedQuestionResponse;
        resopnseModified = true;
      }
    }

    if(!resopnseModified) {
      var questionResponse = {
        questionText: selectedQuestionText,
        questionResponse: selectedQuestionResponse
      };

      this.questionResponses.push(questionResponse);
    }
  }

  submitRecLetter() {
    console.log('Entering submitRecLetter()..');

    this.errorText = null;

    if(!this.fileInput) {
      this.errorText = 'No file selected.';
      return;
    }

    this.filesToUpload = this.fileInput.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.filesToUpload[0]);
      reader.onload = () => {

        let newRecLetter = {
          schoolId: this.$stateParams.schoolId,
          programName: this.$stateParams.programName,
          studentId: this.$stateParams.studentId,
          studentName: this.$stateParams.studentName,
          recLetterContents: reader.result,
          candidateQuestions: this.questionResponses,
          letterId: this.$stateParams.letterId
        };

        const onSuccess = response => {
          if(response.data && response.data.letterId) {
            const letterId = response.data.letterId;
            console.log('Redirecting...');
            this.$location.path(`/recommender-dashboard`);
          } else {
            console.log('Response from posting rec letter: ' + JSON.stringify(response));
            this.errorText = 'Could not get a letterId back from the service.';
          }
        };

        const onError = error => {
          console.log(error);
          this.errorText = 'An error occurred: ' + JSON.stringify(error.data.error);
        };

        this.$http.post('http://localhost:3000/api/RecommendationLetter', newRecLetter)
          .then(onSuccess, onError);
      };
  }

  getCandidateQuestions($scope) {
    console.log('Entering getCandidateQuestions()..schoolId='+$scope.$stateParams.schoolId+'&programName='+$scope.$stateParams.programName);
    this.$http.get('http://localhost:3000/api/DegreePrograms?schoolId='+$scope.$stateParams.schoolId+'&programName='+$scope.$stateParams.programName)
      .then(function(response) {
        $scope.candidateQuestions = response.data[0].candidateQuestions;
     });
  }
}
