'use strict';

/* globals describe, it, before, after */

import app from '../..';
import CandidateQuestion from '../../model/candidatequestions';
import User from '../user/user.model';
import request from 'supertest';

describe('Candidate Question API:', function() {
  var user, q1, q2, q3;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        role: 'anystring',
        password: 'password'
      });
      return user.save();
    });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });

  // Clear candidate questions before testing
  before(function() {
    return CandidateQuestion.remove()
      .then(function() {
        q1 = new CandidateQuestion({
          questionText: 'What is the...?',
          responseChoices: ['yes', 'no', 'maybeso']
        });
        return q1.save();
      })
      .then(function() {
        q2 = new CandidateQuestion({
          questionText: 'How would you place...?',
          responseChoices: ['yes', 'no', 'maybeso']
        });
        return q2.save();
      })
      .then(function() {
        q3 = new CandidateQuestion({
          questionText: 'Do you think the candidate....?',
          responseChoices: ['yes', 'no', 'maybeso']
        });
        return q3.save();
      });
  });

  // Clear candidate questions and user after testing
  after(function() {
    return CandidateQuestion.remove();
  });

  describe('GET /api/CandidateQuestions', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            throw err;
          }
          token = res.body.token;
          done();
        });
    });

    it('should respond with the list of candidate questions when authenticated', function(done) {
      request(app)
        .get('/api/CandidateQuestions')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          res.body.length.should.equal(3);
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/CandidateQuestions')
        .expect(401)
        .end(done);
    });
  });

  describe('POST /api/CandidateQuestion', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            throw err;
          }
          token = res.body.token;
          done();
        });
    });

    it('should create the candidate question when authenticated', function(done) {
      request(app)
        .post('/api/CandidateQuestion')
        .set('authorization', `Bearer ${token}`)
        .send({
          questionText: 'dgqerhqeDescribe blah blah blah...',
          responseChoices: ['1', '2']
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          res.body.questionText.should.equal('dgqerhqeDescribe blah blah blah...');
          res.body.responseChoices[0].should.equal('1');
          res.body.responseChoices[1].should.equal('2');
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .post('/api/CandidateQuestion')
        .expect(401)
        .end(done);
    });
  });

  describe('DELETE /api/CandidateQuestion/:id', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            throw err;
          }
          token = res.body.token;
          done();
        });
    });

    it('should delete the specified candidate question when authenticated', function(done) {
      console.log(q1);
      request(app)
        .delete(`/api/CandidateQuestion/${q1._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          res.body.ok.should.equal(1);
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
      .delete(`/api/CandidateQuestion/${q1._id}`)
      .expect(401)
      .end(done);
    });
  });
});
