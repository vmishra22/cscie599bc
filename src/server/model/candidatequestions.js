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

var CandidateQuestion = module.exports = mongoose.model('CandidateQuestion', CandidateQuestionSchema);