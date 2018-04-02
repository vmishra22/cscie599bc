var mongoose = require('mongoose');

var CandidateQuestionSchema = mongoose.Schema({
    questionText: {
      type: String,
      require: true
    },
    responseChoices: [
      {
        type: String
      }
    ]
});

/**
 * Validations
 */

// Validate empty question text
CandidateQuestionSchema
  .path('questionText')
  .validate(function(questionText) {
    return questionText.length;
  }, 'Question Text cannot be blank');

// Validate no response choices
CandidateQuestionSchema
.path('responseChoices')
.validate(function(responseChoices) {
  if(responseChoices.length == 0) {
    return true;
  } else {
    for(var i = 0; i < responseChoices.length; i++) {
      if(!(responseChoices[i].length > 0)) {
        return false;
      }
    }
  }
  return true;
}, 'Question with Response Choices, cannot have any blank choices');

// Validate question is not a duplicate
CandidateQuestionSchema
  .path('questionText')
  .validate(function(value) {
    return this.constructor.findOne({ questionText: value }).exec()
      .then(question => {
        if(question) {
          return false;
        }
        return true;
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified question already exists.');

export default mongoose.model('CandidateQuestion', CandidateQuestionSchema);
