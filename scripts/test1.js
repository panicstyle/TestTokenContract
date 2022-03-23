const TST2 = artifacts.require("TST2");

module.exports = async function(callback) {
        try {
        const accounts = await web3.eth.getAccounts()
        console.log('accounts address', accounts[0])

        // Fetch the deployed TST2
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        var address = "0x304b3C0f5b2561eE5B03CAD9fA7Da055F9217049"
        var balance = await tst2.balanceOf.call(address)
        console.log('TST2 balanceOf', address, BigInt(balance))

        amount = "10000000000000000000"
        const transferTx = await tst2.transfer("0x304b3C0f5b2561eE5B03CAD9fA7Da055F9217049", amount)
        console.log('TST2 transfer', transferTx.tx)

        balance = await tst2.balanceOf.call(accounts[0])
        console.log('TST2 balanceOf', accounts[0], BigInt(balance))

    }
    catch(error) {
        console.log(error)
    }
    callback()
}
