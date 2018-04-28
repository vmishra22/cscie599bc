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
    studentsCanView: Boolean,
    requestDate: Date,
    recLetterId: String,
    recLetterSubmissionDate: Date
});

var RecLetterRequest = module.exports = mongoose.model('RecLetterRequest', RecLetterRequestSchema);
