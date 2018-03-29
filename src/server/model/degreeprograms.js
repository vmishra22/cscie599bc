var mongoose = require('mongoose');

import { CandidateQuestion } from './candidatequestions';

var DegreeProgramSchema = mongoose.Schema({
    schoolId: String,
    schoolName: String,
    programName: String,
    candidateQuestions: { type: [{
        questionText: {
            type: String
        },
        responseChoices: [
            {
                type: String
            }
        ]}]
    }
});

var DegreeProgram = module.exports = mongoose.model('DegreeProgram', DegreeProgramSchema);