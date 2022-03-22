const TST2 = artifacts.require("TST2");

module.exports = async function(callback) {
	try {
        // Fetch the deployed TST2
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        const balance = await tst2.balanceOf.call("0xa3966d8780e65381863bC947b0042367540846aa")
        console.log('TST2 balanceOf', BigInt(balance))
    }
    catch(error) {
        console.log(error)
    }
    callback()
}
