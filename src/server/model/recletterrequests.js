var mongoose = require('mongoose');

var RecLetterRequestSchema = mongoose.Schema({
    studentId: String,
    studentName: String,
    recommenderId: String,
    recommenderName: String,
    schoolId: String,
    schoolName: String,
    programName: String,
    requestDate: Date,
    recLetterId: String,
    recLetterSubmissionDate: Date
});

var RecLetterRequest = module.exports = mongoose.model('RecLetterRequest', RecLetterRequestSchema);