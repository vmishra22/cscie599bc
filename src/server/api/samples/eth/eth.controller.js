/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/eth              ->  index
 */

'use strict';

export function index(req, res) {
  var web3 = req.app.get('web3');
  web3.eth.getAccounts().then(console.log)
  return res.status(200).json([1, 2, 3]);
}
