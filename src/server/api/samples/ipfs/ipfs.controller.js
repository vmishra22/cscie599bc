/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samples/ipfs              ->  index
 */
/**
 * connect to local ipfs daemon at localhost:5001
 * you need to run ipfs node by command "ipfs daemon'
 */
'use strict';


import ipfsAPI from 'ipfs-api';
import fs from 'fs';


export function connectIpfs(req, res) {
  // or using options
  var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

  ipfs.swarm.peers(function(err, res) {
    if(err) {
      console.error(err);
    } else {
      console.log(`IPFS - connected to ${res.length} peers`);
    }
  });
}

export function storeContent(req, res) {
  var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


  var filePaths = [
    {
      path: 'LetterContract/PdfRecoletter1.pdf', // The file path
     // content: letterPdfBuffer
    },
    {
      path: 'LetterContract/jsonRecoletter1.json',
     // content: letterjsonBuffer
    }
  ];

  var url = Buffer.from(fs.readFileSync('LetterContract/jsonRecoLetter1.json', 'utf8'), 'utf8');
  ipfs.add(url, function(err, result) {
    if(err) {
      console.error('Content submission error:', err);
      return false;
    } else if(result && result[0] && result[0].hash) {
      console.log('Content successfully stored. IPFS address:', result[0].hash);
    } else {
      console.log(result);
      console.log(result[0]);
      console.log(result[0].Hash);
      console.error('Unresolved content submission error');
      return null;
    }
  });
}
