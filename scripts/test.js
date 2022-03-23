const TST2 = artifacts.require("TST2");

module.exports = async function(callback) {
	try {
        const accounts = await web3.eth.getAccounts()
        console.log('accounts address', accounts[0])

        // Fetch the deployed TST2
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        const balance = await tst2.balanceOf.call("0x294EA68BF295f6D8c31B0eB93850dAdA623C0b39")
        console.log('TST2 balanceOf', BigInt(balance))
    }
    catch(error) {
        console.log(error)
    }
    callback()
}
