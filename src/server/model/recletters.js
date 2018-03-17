var mongoose = require('mongoose');

var RecLetterSchema = mongoose.Schema({
    recLetterContents:{
        //type: Buffer,
        type: String,
        require: true
    },
    candidateQuestions: [
        {
            questionText: String,
            questionResponse: String
        }
    ]
});

var RecLetter = module.exports = mongoose.model('RecLetter', RecLetterSchema);