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

        // Deploy the contracts using Hardhat's deployment functions
        // campanhaFactory = await CampanhaFactory.deploy();
        // await campanhaFactory.deployed();

        // Create a campaign through the factory contract
        // await campanhaFactory.createCampanha(100);

        // Get the address of the deployed campaign
        // const [campaignAddress] = await campanhaFactory.getDeployedCampaigns();
        // campanha = await Campanha.attach(campaignAddress);
    });

    describe('CampanhaFactory', () => {
        it('Should deploy the factory contract', async () => {
            const currentTimestampInSeconds = Math.round(Date.now() / 1000);
            const unlockTime = currentTimestampInSeconds + 60;

            const lockedAmount = ethers.parseEther("0.001");

            campanhaFactory = await ethers.deployContract("CampanhaFactory", []);

            await campanhaFactory.waitForDeployment();
            assert.ok(`CampanhaFactory deployed to ${campanhaFactory.target}`);
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
