'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 */
export function index(req, res) {
  console.log(req.query);

  if(req.query.userRole && req.query.userName) {
    return User.find({role: req.query.userRole, name: { $regex: `.*${req.query.userName}.*` }}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
  } else if(req.query.userRole) {
    return User.find({role: req.query.userRole}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
  } else if(req.query.userName) {
    return User.find({name: { $regex: `.*${req.query.userName}.*` }}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
  } else if(req.query.userId) {
    return User.find({_id: req.query.userId}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
  } else {
    return User.find({}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
  }
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      return res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      return res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      return res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => res.status(204).end())
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    })
    .catch(err => handleError(err));
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      return res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
