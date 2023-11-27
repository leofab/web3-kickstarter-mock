import web3 from './web3';

const CampaignFactory = require('./build/contracts/Campanha.sol/CampanhaFactory.json')

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x3e233670c11C021BcC1cB33dB37B2412F9D870ac'
);

export default instance;