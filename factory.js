import web3 from './web3';

const CampaignFactory = require('./build/contracts/Campanha.sol/CampanhaFactory.json')

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x93332FeEF6341782DFf57CCF31868a687Bf790F6'
);

export default instance;