const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'fit hurdle tower glass kangaroo onion gold wedding come glass velvet flee',
  'https://rinkeby.infura.io/h3V4c26Py0504FaBs14M',
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying from account:', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
  )
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
