var mongoose = require('mongoose');

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

module.exports = mongoose.model('DegreeProgram', DegreeProgramSchema);
