const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider()); // ganache.provider() is a provider that connects to the ganache network 
const fs = require('fs-extra');

let accounts;
let factory;
let campanhaAddress;
let campanha;

describe('Tests if the contract is correctly loaded', () => {
    let campanhaFactoryContract;
    let campanhaContract;

    before(() => {
        const filePath = '/home/pc/Área\ de\ Trabalho/kickstart-mock/ethereum/build/CampanhaFactory.json';
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            campanhaFactoryContract = JSON.parse(data);
            // console.log(campanhaFactoryContract); // Verify if the contract object is correctly loaded  
        } catch (err) {
            console.error('Error reading file:', err);
        }
    });

    before(() => {
        const filePath = '/home/pc/Área\ de\ Trabalho/kickstart-mock/ethereum/build/Campanha.json';
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            campanhaContract = JSON.parse(data);
            // console.log(campanhaContract); // Verify if the contract object is correctly loaded  
        } catch (err) {
            console.error('Error reading file:', err);
        }
    });

    // before(async () => {
    //     accounts = await web3.eth.getAccounts();

    //     factory = await new web3.eth.Contract(campanhaFactoryContract.abi)
    //         .deploy({ data: campanhaFactoryContract.deployedBytecode })
    //         .send({ from: accounts[0], gas: '1000000' });

    //     await factory.methods.createCampanha('100').send({
    //         from: accounts[0],
    //         gas: '1000000'
    //     });

    //     [campanhaAddress] = await factory.methods.getDeployedCampaigns().call();
    //     campanha = await new web3.eth.Contract(
    //         campanhaContract.abi),
    //         campanhaAddress;
    // });

    before(async () => {
        accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);

        const dataFactory = fs.readFileSync('/home/pc/Área de Trabalho/kickstart-mock/ethereum/build/CampanhaFactory.json', 'utf8');
        campanhaFactoryContract = JSON.parse(dataFactory);

        factory = await new web3.eth.Contract(campanhaFactoryContract.abi)
            .deploy({ data: campanhaFactoryContract.evm.deployedBytecode.object })
            .send({ from: accounts[0], gas: 0 });

        factory.methods.createCampanha(100).send({
            from: accounts[0], gas: 0
        });

        campanhaAddress = factory.methods.getDeployedCampaigns().call();
        campanha = new web3.eth.Contract(campanhaContract.abi, campanhaAddress);
    });

    it('Is file loaded correctly?', () => {
        assert.ok(campanhaFactoryContract); // Verify if the contract object is correctly loaded
        assert.ok(campanhaContract); // Verify if the contract object is correctly loaded
    });
    it('Is the interface loaded correctly?', () => {
        assert.ok(campanhaFactoryContract.abi); // Verify if the contract object is correctly loaded
        assert.ok(campanhaContract.abi); // Verify if the contract object is correctly loaded
    });


    it('deploys a factory and a campanha', () => {
        // assert.ok(factory.options.address);
        // assert.ok(campanha.options.address);
        assert.ok(accounts);
        console.log(accounts[0]);
    });
});