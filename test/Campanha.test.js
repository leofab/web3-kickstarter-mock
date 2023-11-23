const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); // ganache.provider() is a provider that connects to the ganache network 

const compiledFactory = require('../ethereum/build/CampanhaFactory.json');
const compiledCampanha = require('../ethereum/build/Campanha.json');

let accounts;
let factory;
let campanhaAddress;
let campanha;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});