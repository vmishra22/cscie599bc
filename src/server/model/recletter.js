var mongoose = require('mongoose');

var RecLetterSchema = mongoose.Schema({
    rec_letter_contents:{
        //type: Buffer,
        type: String,
        require: true
    },
    questions: [
        {
            question_text: String,
            question_response: String
        }
    ]
});

var RecLetter = module.exports = mongoose.model('RecLetter', RecLetterSchema);