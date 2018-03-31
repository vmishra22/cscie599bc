/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';

import CandidateQuestion from '../model/candidatequestions';
import DegreeProgram from '../model/degreeprograms';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your app.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

      User.remove({email: 'test@example.com'})
      .then(() => {
        User.create({
          provider: 'local',
          role: 'student',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        })
        .catch(err => console.log('error populating users', err));
      });

      User.remove({email: 'admin@example.com'})
      .then(() => {
        User.create({
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
      
    CandidateQuestion.find({}).remove()
    .then(() => {
      CandidateQuestion.create({
        questionText: 'In what capacity have you known the applicant?',
        responseChoices: [
          'Large Class / Lecture',
          'Small Class / Seminar/ Lab',
          'Independent Study Student',
          'Advisee',
          'Other'
        ]
      },
      // {
      //   questionText: 'How well do you know the applicant?',
      //   responseChoices: [
      //     'See on a regular basis',
      //     'At one time',
      //     'Knew him/her only through in-class contact',
      //     'Only through records'
      //   ]
      // },
      // {
      //   questionText: 'What is your overall ranking of this student compared to other students?',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Analytical ability',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Quantitative ability',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Ability in oral expression',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Analytical in written expression',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Imagination and Creativity',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Ability to work with others',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Flexibility',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Maturity',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Confidence',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Leadership',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      // {
      //   questionText: 'Motivation for proposed program of study',
      //   responseChoices: [
      //     'Upper 50%',
      //     'Lower 50%',
      //     'Upper 25%',
      //     'Upper 10%',
      //     'No basis for judgment'
      //   ]
      // },
      {
        questionText: 'Background for proposed program of study',
        responseChoices: [
          'Upper 50%',
          'Lower 50%',
          'Upper 25%',
          'Upper 10%',
          'No basis for judgment'
        ]
      })
      .then(() => console.log('finished populating candidate questions'))
      .catch(err => console.log('error populating candidate questions', err));
    });

    // DegreeProgram.find({}).remove()
    // .then(() => {});
  }
}
