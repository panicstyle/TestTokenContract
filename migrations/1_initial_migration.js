const Contracts = artifacts.require("TST2");

module.exports = function (deployer) {
  deployer.deploy(Contracts);
};
