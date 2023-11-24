const assert = require('assert');
const ganache = require('ganache-cli');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider()); // ganache.provider() is a provider that connects to the ganache network 
const fs = require('fs-extra');

describe('Your Test Suite Description', () => {
    let campanhaFactoryContract;

    before(() => {
        const filePath = '../ethereum/build/CampanhaFactory.json';
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            campanhaFactoryContract = JSON.parse(data);
        } catch (err) {
            console.error('Error reading file:', err);
        }
    });

    it('Your Test Case Description', () => {
        assert.ok(campanhaFactoryContract); // Verify if the contract object is correctly loaded
    });
});

// const compiledFactory = fs.readFileSync('../ethereum/build/CampanhaFactory.json', 'utf8');
// const compiledCampanha = require('../ethereum/build/Campanha.json');

// let accounts;
// let factory;
// let campanhaAddress;
// let campanha;

// fs.readFile('../ethereum/build/CampanhaFactory.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     const campanhaFactoryContract = JSON.parse(data);
//     console.log(campanhaFactoryContract); // Verify if the contract object is correctly loaded
// });


// beforeEach(async () => {
//     accounts = await web3.eth.getAccounts();

//     factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
//         .deploy({ data: compiledFactory.bytecode })
//         .send({ from: accounts[0], gas: '1000000' });

//     await factory.methods.createCampanha('100').send({
//         from: accounts[0],
//         gas: '1000000'
//     });

//     [campanhaAddress] = await factory.methods.getDeployedCampaigns().call();
//     campanha = await new web3.eth.Contract(
//         JSON.parse(compiledCampanha.interface),
//         campanhaAddress
//     );
// });

// describe('Campanhas', () => {
//     it('deploys a factory and a campanha', () => {
//         assert.ok(factory.options.address);
//         assert.ok(campanha.options.address);
//     });
// });