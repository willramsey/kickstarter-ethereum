import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8335118F824EAE6741606D0a6C3a02EEc78D2fF0',
);

export default instance;
