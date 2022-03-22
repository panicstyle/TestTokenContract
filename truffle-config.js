const HDWalletProvider = require('@truffle/hdwallet-provider');
const { infuraProjectId, privateKey, etherscanApiKey } = require('./secrets.json');

module.exports = {
	networks: {
		rinkeby: {
			provider: () => new HDWalletProvider(privateKey, `https://rinkeby.infura.io/v3/${infuraProjectId}`),
			network_id: 4,       // rinkeby's id
			gas: 5500000,        // rinkeby has a lower block limit than mainnet
			confirmations: 2,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
		},
		rinkebyNanox: {
			provider: () => new HDWalletProvider.ledgerBLE({
				rpc: 'http://localhost:8545', // mandatory
				path: "m/44'/60'/0'/0", // optional
				numberOfAccounts: 1, // optional
				accountsOffset: 0, // optional
				askConfirm: false}), // optional,
			network_id: 4,       // rinkeby's id
			gas: 5500000,        // rinkeby has a lower block limit than mainnet
			confirmations: 2,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
		},
		mainnet: {
			provider: () => new HDWalletProvider(privateKey, `https://mainnet.infura.io/v3/${infuraProjectId}`),
			network_id: 1,       // mainnet's id
			gas: 5500000,        // mainnet has a lower block limit than mainnet
			confirmations: 2,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
		},
		development: {
			host: "127.0.0.1",     // Localhost (default: none)
			port: 8545,            // Standard Ethereum port (default: none)
			network_id: "*",       // Any network (default: none)
		}
	},

	mocha: {
		// timeout: 100000
	},

	compilers: {
		solc: {
			version: "0.8.5",
		}
	},
	plugins: [
		'truffle-plugin-verify',
	],
	api_keys: {
		etherscan: etherscanApiKey,
	}
};