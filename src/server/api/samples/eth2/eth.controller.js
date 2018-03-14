'use strict';

import * as contractService from './contract.service';

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

export function getData(req,res) {
  return contractService.getContractData()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(handleError(res));
}

export function setData(req,res) {
  var data = req.body.data;
  // TODO: should check if input is valid
  return contractService.setContractData(data)
    .then(function() {
      res.status(200).send(true)
    })
    .catch(handleError(res))
}

export function index(req, res) {
  return res.status(200).send(contractService.getContractInfo());
}
