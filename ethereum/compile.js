const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'Campanha.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Campanha.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for errors
if (output.errors) {
    console.error('Compilation errors:');
    output.errors.forEach((err) => {
        console.error(err.formattedMessage);
    });
    process.exit(1);
}

const contracts = output.contracts['Campanha.sol'];

for (let contractName in contracts) {
    const contract = contracts[contractName];
    fs.outputJsonSync(
        path.resolve(__dirname, 'build', contractName + '.json'),
        contract,
        { spaces: 2 }
    );
}