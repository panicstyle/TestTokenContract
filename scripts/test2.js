const TST2 = artifacts.require("TST2");
const data = require("../data.json");

module.exports = async function(callback) {
        try {
        const accounts = await web3.eth.getAccounts()
        console.log('accounts address', accounts[0])

        // Fetch the deployed TST2
//        const tst2 = await TST2.deployed()
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        for(idx in data){
                console.log(data[idx]);
                var address = data[idx].address
                const balance = await tst2.balanceOf.call(address)
                console.log('TST2 balanceOf', address, BigInt(balance))
        };

//        const balance = await tst2.balanceOf.call(accounts[0])
//        console.log('TST2 balanceOf', BigInt(balance))

    }
    catch(error) {
        console.log(error)
    }
    callback()
}
