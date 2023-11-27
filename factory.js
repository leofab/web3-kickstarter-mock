import web3 from './web3';

const CampaignFactory = require('./build/contracts/Campanha.sol/CampanhaFactory.json')

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x39beA4F2e4407753Ed67789c52e7b2C181697756'
);

export default instance;