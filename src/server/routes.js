/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth').default);
  app.use('/api/samples/eth', require('./api/samples/eth'));
  app.use('/api/samples/eth2', require('./api/samples/eth2'));
  app.use('/api/samples/ipfs', require('./api/samples/ipfs'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the app.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/app.html`));
    });
}
