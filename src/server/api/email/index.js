'use strict';

let express = require('express');
let controller = require('./email.controller');

let router = express.Router();

import * as auth from '../../auth/auth.service';

router.post('/emailRecommender', controller.emailRecommender);

router.post('/emailRegistrationConfirmation', controller.emailRegistrationConfirmation);

module.exports = router;
