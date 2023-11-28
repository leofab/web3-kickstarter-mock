import web3 from './web3';
import CampaignFactory from './build/contracts/Campanha.sol/CampanhaFactory.json';

export default (address) => {
    return new web3.eth.Contract(
        CampaignFactory.abi,
        address
    );
};

