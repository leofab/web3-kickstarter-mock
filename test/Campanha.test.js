const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Tests if the contract is correctly loaded', function () {
    let CampanhaFactory;
    let Campanha;
    let campanhaFactory;
    let campanha;

    before(async () => {
        // Load the contracts via Hardhat's artifacts
        CampanhaFactory = await ethers.getContractFactory('CampanhaFactory');
        Campanha = await ethers.getContractFactory('Campanha');
    });

    describe('CampanhaFactory', () => {
        it('Should deploy the factory contract', async () => {

            campanhaFactory = await ethers.deployContract("CampanhaFactory", []);

            await campanhaFactory.waitForDeployment();
            assert.ok(`CampanhaFactory deployed to ${campanhaFactory.target}`);
            console.log(
                `CampanhaFactory deployed to ${campanhaFactory.target}`
            );
        });
        it('Should create a new campaign', async () => {
            campanhaFactory = await ethers.deployContract("CampanhaFactory", []);
            await campanhaFactory.waitForDeployment();
            console.log(
                `CampanhaFactory deployed to ${campanhaFactory.target}`
            );
            const tx = await campanhaFactory.getFunction('createCampanha')(100);
            const receipt = await tx.wait();
            console.log(receipt);
            // campanha = await ethers.getContractAt("Campanha", receipt.events[0].args.campanhaAddress);
            // assert.ok(`Campanha deployed to ${campanha.target}`);
            // console.log(
            //     `Campanha deployed to ${campanha.target}`
            // );
        });
    });

    it('Is file loaded correctly?', () => {
        assert.ok(CampanhaFactory); // Verify if the contract object is correctly loaded
        assert.ok(Campanha); // Verify if the contract object is correctly loaded
    });

    it('Is the interface loaded correctly?', () => {
        assert.ok(CampanhaFactory.interface); // Verify if the contract interface is correctly loaded
        assert.ok(Campanha.interface); // Verify if the contract interface is correctly loaded
    });

    // Add more test cases as needed
});
