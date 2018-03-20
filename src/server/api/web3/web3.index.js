'use strict';

import {Router} from 'express';
import * as controller from './eth.controller';
import * as authService from '../../auth/auth.service';

var router = new Router();

/*
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
*/

router.get('/node', authService.hasRole('admin'), controller.node.show);
router.post('/node', authService.hasRole('admin'), controller.node.start);
router.delete('/node', authService.hasRole('admin'), controller.node.stop);
router.put('/node/provider', authService.hasRole('admin'), controller.changeProvider);

router.use('/accounts',authService.isAuthenticated());

router.get('/account', controller.account.index);
router.get('/account/address=:address', controller.account.show)
router.get('/account/name=:name',controller.account.show)
router.post('/account',controller.account.create)


router.use('/contracts',authService.hasRole('admin'));

router.get('/contracts', authService.hasRole('admin'), controller.listContracts);
router.get('/contracts/:name', authService.isAuthenticated(), controller.getContract);
router.get('/contracts/:name/:method', controller.callMethod);
router.get('/contracts/:name/send/:method/from/:from', controller.sendMethod);
router.post('/contracts', controller.compileContract);
router.post('/contracts/prepare/:name/:abi/:bytecode', controller.prototypeContract);
router.post('/contracts/deploy/:name', controller.deployContract);
router.put('/contracts/pull/:name/:abi/:address', controller.pullContract);

module.exports = router;
