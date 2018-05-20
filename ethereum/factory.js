import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x0B28Ef083821AbB3Bf66Ea18A5D0E9811aD600e5',
);

export default instance;
