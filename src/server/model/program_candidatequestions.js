var mongoose = require('mongoose');

var ProgramCandidateQuestionSchema = mongoose.Schema({
    schoolId: String,
    programName: String,
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

var ProgramCandidateQuestion = module.exports = mongoose.model('ProgramCandidateQuestion', ProgramCandidateQuestionSchema);