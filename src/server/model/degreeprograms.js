var mongoose = require('mongoose');

import { candidateQuestion } from './candidatequestions';

var DegreeProgramSchema = mongoose.Schema({
    schoolId: String,
    programName: String,
    candidateQuestions: [
        {
            type: candidateQuestion
        }
    ]
});

var DegreeProgram = module.exports = mongoose.model('DegreeProgram', DegreeProgramSchema);