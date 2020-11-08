const KittyToken = artifacts.require("Kittycontract");

module.exports = function(deployer) {
    deployer.deploy(KittyToken);
};
