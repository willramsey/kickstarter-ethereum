import Web3 from 'web3';

let web3;

// Browser environment and metamask running
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);

  // Server environment OR metamask is not running
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/h3V4c26Py0504FaBs14M',
  );

  web3 = new Web3(provider);
}

export default web3;
