
import { Connect, SimpleSigner } from 'uport-connect'



const uport = new Connect('Ying\'s new app', {
  clientId: '2p26XuJHgEueVSjd2dCBmMBjC4sF2rJEVDL',
  network: 'rinkeby or ropsten or kovan',
  signer: SimpleSigner('8b20dd8f4451458a93bf0ddf210dd3f7edaba13982d6cfd38a0b1525c0b40178')
})

// Request credentials to login
uport.requestCredentials({
  requested: ['name', 'phone', 'country'],
  notifications: true // We want this if we want to recieve credentials
})
  .then((credentials) => {
    // Do something
  })

// Attest specific credentials
uport.attestCredentials({
  sub: THE_RECEIVING_UPORT_ADDRESS,
  claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
  },
  exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})
