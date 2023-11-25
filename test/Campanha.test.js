const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const fs = require('fs-extra');

let accounts;
let factory;
let campanhaAddress;
let campanha;

const compiledFactory = fs.readFileSync('/home/pc/Área\ de\ Trabalho/kickstart-mock/ethereum/build/CampanhaFactory.json', 'utf8');
const compiledCampanha = fs.readFileSync('/home/pc/Área\ de\ Trabalho/kickstart-mock/ethereum/build/Campanha.json', 'utf8');

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.abi))
        .deploy({ data: '0x' + JSON.parse(compiledFactory).evm.bytecode.object })
        .send({ from: accounts[0], gas: '1500000' });

    await factory.methods.criarCampanha('100').send({ from: accounts[0], gas: '1500000' });

    [campanhaAddress] = await factory.methods.getDeployedCampanhas().call();

    campanha = await new web3.eth.Contract(compiledCampanha.abi, campanhaAddress);
});

describe('Campanhas', () => {
    it('deploys a factory and a campanha', () => {
        assert.ok(factory.options.address);
        assert.ok(campanha.options.address);
    });
});