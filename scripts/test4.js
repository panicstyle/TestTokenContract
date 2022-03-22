const TST2 = artifacts.require("TST2");
const data = require("../data.json");

module.exports = async function(callback) {
        try {
        // Fetch the deployed TST2
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        for(idx in data){
                console.log(data[idx]);
                // transferWithLock
                const transferTx = await tst2.transferWithLock(data[idx].address, BigInt(data[idx].amount), BigInt(data[idx].releaseTime))
                console.log('TST2 transferWithLock', transferTx.tx)
        };
    }
    catch(error) {
        console.log(error)
    }
    callback()
}
