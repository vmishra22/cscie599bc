'use strict';

import {Router} from 'express';
import * as controller from './eth.controller';
import * as auth from '../../../auth/auth.service';

var router = new Router();

router.get('/no_auth/contract', controller.index);
router.get('/no_auth/contract/data', controller.getData);
router.put('/no_auth/contract/data', controller.setData);

router.get('/authorized/contract', auth.isAuthenticated(), controller.index);
router.get('/authorized/contract/data', auth.isAuthenticated(), controller.getData);
router.put('/authorized/contract/data', auth.isAuthenticated(), controller.setData);

router.get('/admin/contract', auth.hasRole('admin'), controller.index);
router.get('/admin/contract/data', auth.hasRole('admin'), controller.getData);
router.put('/admin/contract/data', auth.hasRole('admin'), controller.setData);

module.exports = router;
