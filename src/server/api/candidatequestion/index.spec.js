'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var candidateQuestionCtrlStub = {
  getCandidateQuestions: 'candidateQuestionCtrl.getCandidateQuestions',
  deleteCandidateQuestion: 'candidateQuestionCtrl.deleteCandidateQuestion',
  createCandidateQuestion: 'candidateQuestionCtrl.createCandidateQuestion'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var candidateQuestionIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './candidatequestion.controller': candidateQuestionCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Candidate Question API Router:', function() {
  it('should return an express router instance', function() {
    candidateQuestionIndex.should.equal(routerStub);
  });

  describe('GET /api/CandidateQuestions', function() {
    it('should verify authenticated and route to candidatequestion.controller.getCandidateQuestions', function() {
      routerStub.get
        .withArgs('/CandidateQuestions', 'authService.isAuthenticated', 'candidateQuestionCtrl.getCandidateQuestions')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/CandidateQuestion/:id', function() {
    it('should verify authenticated and route to candidatequestion.controller.deleteCandidateQuestion', function() {
      routerStub.delete
        .withArgs('/CandidateQuestion/:id', 'authService.isAuthenticated', 'candidateQuestionCtrl.deleteCandidateQuestion')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/CandidateQuestion', function() {
    it('should route to candidatequestion.controller.createCandidateQuestion', function() {
      routerStub.post
        .withArgs('/CandidateQuestion', 'authService.isAuthenticated', 'candidateQuestionCtrl.createCandidateQuestion')
        .should.have.been.calledOnce;
    });
  });
});
