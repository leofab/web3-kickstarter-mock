const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Tests if the contract is correctly loaded', function () {
    let CampanhaFactory;
    let Campanha;
    let campanhaFactory;
    let campanha;
    let campanhaFactoryReceipt;
    let campanhaReceipt;
    let campanha2;
    let acc0;
    let acc1;

    beforeEach(async () => {
        // Load the contracts via Hardhat's artifacts
        CampanhaFactory = await ethers.getContractFactory('CampanhaFactory');
        Campanha = await ethers.getContractFactory('Campanha');
        campanhaFactory = await ethers.deployContract("CampanhaFactory", []);
        await campanhaFactory.waitForDeployment();
        campanhaFactoryReceipt = await campanhaFactory.deploymentTransaction();
        await campanhaFactory.getFunction('createCampanha')(100);
        const campanhaAddress = await campanhaFactory.getFunction('getDeployedCampaigns')();
        campanha = await ethers.deployContract("Campanha", [0, campanhaFactory.deploymentTransaction().from]);
        await campanha.waitForDeployment();
        campanhaReceipt = await campanha.deploymentTransaction();
        [acc0, acc1] = await ethers.getSigners();
        campanha2 = await ethers.deployContract("Campanha", [0, acc1]);
        // campanhaReceipt = await campanha.deploymentTransaction();
        // fromWho = campanhaReceipt.from;
    });

    // describe('CampanhaFactory', () => {
    //     it('Should deploy the factory contract', async () => {
    //
    //         campanhaFactory = await ethers.deployContract("CampanhaFactory", []);
    //
    //         await campanhaFactory.waitForDeployment();
    //         assert.ok(`CampanhaFactory deployed to ${campanhaFactory.target}`);
    //         console.log(
    //             `CampanhaFactory deployed to ${campanhaFactory.target}`
    //         );
    //     });
        // it('Should create a new campaign', async () => {
        //     campanhaFactory = await ethers.deployContract("CampanhaFactory", []);
        //     await campanhaFactory.waitForDeployment();
        //     console.log(
        //         `CampanhaFactory deployed to ${campanhaFactory.target}`
        //     );
        //     campanha = await campanhaFactory.getFunction('createCampanha')(100);
        //     const receipt = await campanha.wait();
        //     console.log(receipt);
            // campanha = await ethers.getContractAt("Campanha", receipt.events[0].args.campanhaAddress);
            // assert.ok(`Campanha deployed to ${campanha.target}`);
            // console.log(
            //     `Campanha deployed to ${campanha.target}`
            // );
    //     });
    // });

    it('Is file loaded correctly?', () => {
        assert.ok(CampanhaFactory); // Verify if the contract object is correctly loaded
        assert.ok(Campanha); // Verify if the contract object is correctly loaded
    });

    it('Is the interface loaded correctly?', () => {
        assert.ok(CampanhaFactory.interface); // Verify if the contract interface is correctly loaded
        assert.ok(Campanha.interface); // Verify if the contract interface is correctly loaded
    });

    it ('Is factory contract deployed?', async () => {
        console.log(
            `CampanhaFactory deployed to ${campanhaFactory.target}`)
        assert.ok(`CampanhaFactory deployed to ${campanhaFactory.target}`);
    });
    it('Is campaign contract deployed?', async () => {
        console.log(
            `Campanha deployed to ${campanha.target}`);
        assert.ok(`Campanha deployed to ${campanha.target}`);
    });

    it('Who is the Manager of the campanha and it is the same as the caller?', async () => {
        const manager = await campanha.getFunction('manager')();
        console.log(`Manager: ${manager}\n`);
        assert.equal(manager, campanhaFactoryReceipt.from);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await campanha.getFunction('contribute')({value: '200', from: campanhaFactory.deploymentTransaction().from});
        const isContributor = await campanha.getFunction('contributers')(campanhaFactory.deploymentTransaction().from);
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await campanha.getFunction('contribute')({value: '5', from: campanhaFactory.deploymentTransaction().from});
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('asserts campanha2 is deployed with another creator', async () => {
        const manager = await campanha2.getFunction('manager')();
        console.log(`Manager: ${manager}\n`);
        assert.notEqual(manager, acc1);
    });

    it('allows a manager to make a payment request', async () => {
        await campanha.getFunction('createRequest')('Buy batteries', '100', acc1, {from: acc0});
        const request = await campanha.getFunction('requests')(0);
        assert.equal('Buy batteries', request.description);
    });

    it('requires that only manager creates a payment request', async () => {
        try {
            await campanha.getFunction('createRequest')('Buy batteries', '100', acc1, {from: acc1});
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    // Add more test cases as needed
});
