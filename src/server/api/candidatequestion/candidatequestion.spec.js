'use strict';

/* globals describe, before, beforeEach, afterEach, it */

import app from '../..';
import CandidateQuestion from '../../model/candidatequestions';
var candidateQuestion;
var genCandidateQuestion = function() {
  candidateQuestion = new CandidateQuestion({
    questionText: 'Question?',
    responseChoices: []
  });
  return candidateQuestion;
};

describe('CandidateQuestion Model', function() {
  before(function() {
    // Clear candidate questions before testing
    return CandidateQuestion.remove();
  });

  beforeEach(function() {
    genCandidateQuestion();
  });

  afterEach(function() {
    return CandidateQuestion.remove();
  });

  it('should begin with no questions', function() {
    return CandidateQuestion.find({}).exec().should
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate question', function() {
    return candidateQuestion.save()
      .then(function() {
        var candidateQuestionDup = genCandidateQuestion();
        return candidateQuestionDup.save();
      }).should.be.rejected;
  });

  describe('#questionText', function() {
    it('should fail when saving with a blank question text', function() {
      candidateQuestion.questionText = '';
      return candidateQuestion.save().should.be.rejected;
    });
    // add additional tests when more validation is added to model
  });

  describe('#responseChoices', function() {
    it('should not fail if there are no response choices', function() {
      candidateQuestion.responseChoices = [];
      return candidateQuestion.save().should.not.be.rejected;
    });

    it('should fail when saving with a blank response choice', function() {
      candidateQuestion.responseChoices = ['', 'yes', 'no'];
      return candidateQuestion.save().should.be.rejected;
    });
    // add additional tests when more validation is added to model
  });
});
