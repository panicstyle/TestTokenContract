const TST2 = artifacts.require("TST2");

module.exports = async function(callback) {
	try {
        const accounts = await web3.eth.getAccounts()
        console.log('accounts address', accounts[0])

        // Fetch the deployed TST2
//        const tst2 = await TST2.deployed()
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        const balance = await tst2.balanceOf.call(accounts[0])
        console.log('TST2 balanceOf', BigInt(balance))

        // transferWithLock
//        const amount = BigInt("1000000000000000000000")
//        const releaseTime = BigInt(1647356854)
//        const transferTx = await tst2.transferWithLock("0x304b3C0f5b2561eE5B03CAD9fA7Da055F9217049", amount, releaseTime)
//        console.log('TST2 transferWithLock', transferTx.tx)

        const index = BigInt(0)
        const locked = await tst2.lockInfo.call("0x304b3C0f5b2561eE5B03CAD9fA7Da055F9217049", index)
        console.log('TST2 locked.releaseTime', BigInt(locked.releaseTime))
        console.log('TST2 locked.amount', BigInt(locked.amount))
    }
    catch(error) {
        console.log(error)
    }
    callback()
}
