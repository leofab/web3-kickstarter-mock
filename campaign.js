import web3 from './web3';
import Campanha from './build/contracts/Campanha.sol/Campanha.json';

export default (address) => {
    return new web3.eth.Contract(
        Campanha.abi,
        address
    );
};

