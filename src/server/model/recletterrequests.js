var mongoose = require('mongoose');

var RecLetterRequestSchema = mongoose.Schema({
    studentId: String,
    recommenderId: String,
    schoolId: String,
    programName: String,
    requestDate: Date,
    recLetterId: String
});

var RecLetterRequest = module.exports = mongoose.model('RecLetterRequest', RecLetterRequestSchema);