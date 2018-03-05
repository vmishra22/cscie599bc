'use strict';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
      .state('eth', {
        url: '/samples/eth',
        template: require('./eth/eth.html'),
        controller: 'EthController',
        controllerAs: 'vm'
      })
      .state('ipfs', {
        url: '/samples/ipfs',
        template: require('./ipfs/ipfs.html'),
        controller: 'IpfsController',
        controllerAs: 'vm'
      })
      .state('mongo', {
        url: '/samples/mongo',
        template: require('./mongo/mongo.html'),
        controller: 'MongoController',
        controllerAs: 'vm'
      });
}
