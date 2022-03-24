const LedgerWalletProvider = require('@ledgerhq/web3-subprovider');
const createLedgerSubprovider = LedgerWalletProvider.default;
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
const { infuraProjectId, privateKey, etherscanApiKey } = require('./secrets.json');

//const logger = require("@ledgerhq/logs");
//logger.listen(log => console.log(log));

const localNode = 'http://127.0.0.1:8545';

const getTransport = () => TransportNodeHid.create();
const ledger = createLedgerSubprovider(getTransport, {
    networkId: 4, paths: ["44'/60'/0'/0/0"], askConfirm: false,
});

const engine = new ProviderEngine();
engine.addProvider(ledger);
engine.addProvider(new RpcSubprovider({ rpcUrl: `https://mainnet.infura.io/v3/${infuraProjectId}` }));
engine.start();

module.exports = engine;