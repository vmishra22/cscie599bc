var mongoose = require('mongoose');

var RecLetterRequestSchema = mongoose.Schema({
    requestId: String,
    letterStatus: String,
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

module.exports = mongoose.model('RecLetterRequest', RecLetterRequestSchema);
