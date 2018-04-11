/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import config from './environment/';

import CandidateQuestion from '../model/candidatequestions';
import DegreeProgram from '../model/degreeprograms';

export default function seedDatabaseIfNeeded() {
  //Sample schools
  const schools = [
    {
      provider: 'local',
      name: "Harvard",
      email: "harvard@harvard.edu",
      addressLine1: "123 College",
      city: "Cambridge",
      state: "MA",
      zip: "12345",
      schoolContactName: "John Harvard",
      schoolContactNumber: "(123) 456-7890",
      role : "school",
      password: "test"
    },

    {
      provider: 'local',
      name: "Stanford",
      email: "standford@stanford.edu",
      addressLine1: "...",
      city: "...",
      state: "...",
      zip: "...",
      schoolContactName: "...",
      schoolContactNumber: "(123) 456-7890",
      role : "school",
      password: "test"
    },

    {
      provider: 'local',
      name: "MIT",
      email: "mit@mit.edu",
      addressLine1: "123 College",
      city: "...",
      state: "...",
      zip: "...",
      schoolContactName: "...",
      schoolContactNumber: "(123) 456-7890",
      role : "school",
      password: "test"
    },
    
    {
      provider: 'local',
      name: "NYU",
      email: "nyu@nyu.edu",
      addressLine1: "123 College",
      city: "...",
      state: "...",
      zip: "...",
      schoolContactName: "...",
      schoolContactNumber: "(123) 456-7890",
      role : "school",
      password: "test"
    },

    {
      provider: 'local',
      name: "Waterloo",
      email: "waterloo@waterloo.edu",
      addressLine1: "123 College",
      city: "...",
      state: "...",
      zip: "...",
      schoolContactName: "...",
      schoolContactNumber: "(123) 456-7890",
      role : "school",
      password: "test"
    },
  ];

  //Sample questions
  const completeQuestions = [
    {
      questionText: 'In what capacity have you known the applicant?',
      responseChoices: [ 
        'Large Class / Lecture',
        'Small Class / Seminar/ Lab',
        'Independent Study Student', 
        'Advisee','Other'
      ]
    },
    {
      questionText: 'How well do you know the applicant?',
      responseChoices: [
        'See on a regular basis',
        'At one time',
        'Knew him/her only through in-class contact',
        'Only through records'
      ]
    }
  ];
  const percentileQuestions = [
    'What is your overall ranking of this student compared to other students?',
    'Analytical ability',
    'Quantitative ability',
    'Ability in oral expression',
    'Analytical in written expression',
    'Imagination and Creativity',
    'Ability to work with others',
    'Flexibility',
    'Maturity',
    'Confidence',
    'Leadership',
    'Motivation for proposed program of study',
    'Background for proposed program of study'
  ].map(q => {
    return {
      questionText: q,
      responseChoices: [ 'Upper 50%', 'Lower 50%', 'Upper 25%', 'Upper 10%', 'No basis for judgment']
    }
  });
  const questions = completeQuestions.concat(percentileQuestions)

  //Sample Degree Programs
  if(config.seedDB) {
    const schoolEmails = schools.map(s => s.email );
    User.remove({email: {$in: schoolEmails}})
      .then(() => User.create(schools))
      .catch(err => console.log('Error creating schools: ', err));

    CandidateQuestion.find({}).remove()
      .then(() => CandidateQuestion.create(questions));
  }
}
