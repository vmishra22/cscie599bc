var mongoose = require('mongoose');

var RecLetterSchema = mongoose.Schema({
    letterId: String,
    studentId: String,
    recommenderId: String,
    schoolId: String,
    studentName: String,
    recommenderName: String,
    programName: String,
    submissionDate: Date
});

var RecLetter = module.exports = mongoose.model('RecLetter', RecLetterSchema);
