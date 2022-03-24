const TST2 = artifacts.require("TST2");
const vestingData = require("./vestingData.json");
const util = require('util');
const fileLog = require("./fileLog.js");

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function leftPad(value) { if (value >= 10) { return value; } return `0${value}`; }
function toStringByFormatting(source, delimiter = '-') { const year = source.getFullYear(); const month = leftPad(source.getMonth() + 1); const day = leftPad(source.getDate()); return [year, month, day].join(delimiter); }

module.exports = async function(callback) {
        try {
        // Fetch the deployed Contract TST2
        const tst2 = await TST2.at("0x53605B075F8ADac425393E988a13b6faEa431Bf7")
        console.log('TST2 fetched', tst2.address)

        var cnt = 0;
        for(idx in vestingData){
            cnt++;
            const data = vestingData[idx];
            console.log(data);

            fileLog.writeln("---------------------------------------------------------------------------------");
            fileLog.writeln(util.format("%d/%d", cnt, vestingData.length));
            fileLog.writeln(util.format("address: %s", data.address));
            fileLog.writeln(util.format("amount: %s", data.amount));
            fileLog.writeln(util.format("vestingCount: %d", data.vestingCount));
            fileLog.writeln(util.format("firstReleaseDate: %s", data.firstReleaseDate));
            fileLog.writeln(util.format("vestingInterval: %s", data.vestingInterval));

            // 최초 릴리즈일자가 오늘 이후여야 함. 금일이거나 금일보다 작으면 오류
            var firstReleaseDate = new Date(data.firstReleaseDate);
            var today = new Date();
            console.log("firstReleaseDate", firstReleaseDate, "today", today);
            if (today >= firstReleaseDate) {
//                throw new Error('firstReleaseDate is invalid.')
                console.log("firstReleaseDate is invalid.");
                fileLog.writeln(util.format("\tError: firstReleaseDate is invalid."));
                continue;
            }

            // amount 를 vestingCount 를 나누었을 때 나머지 없이 나누어져야 함.
            var vestingAmount = parseInt(data.amount / data.vestingCount);
            console.log("amount:", data.amount, "vestingAmount:", vestingAmount, "vestingCount:", data.vestingCount);
            if ((vestingAmount * data.vestingCount) != data.amount) {
//                throw new Error('amount is invalid.')
                console.log("amount is invalid.");
                fileLog.writeln(util.format("\tError: amount is invalid."));
                continue;
            }

            // vestingAmount 를 WEI 단위로 변환
            var vestingAmountWei = vestingAmount * (10 ** 18);
            for (var i=0; i < data.vestingCount; i++) {
                var vestingDate = firstReleaseDate.addDays(i * data.vestingInterval);
                var vestingTimestamp = vestingDate.getTime()/1000;
                console.log("vesingDate:", vestingDate, "vestingTimestamp:", vestingTimestamp, "vestingAmountWei:", vestingAmountWei);

                // transferWithLock
                console.log("address:", data.address, "vestingAmountWei:", vestingAmountWei, "vestingTimestamp:", vestingTimestamp);
                const transferTx = await tst2.transferWithLock(data.address, BigInt(vestingAmountWei), BigInt(vestingTimestamp))
                console.log('TST2 transferWithLock', transferTx.tx)
                fileLog.writeln(util.format("\t%d/%d", i + 1, data.vestingCount));
                fileLog.writeln(util.format("\tvestringDate=%s, vestingAmount=%d", toStringByFormatting(vestingDate), vestingAmount));
                fileLog.writeln(util.format("\ttransferWithLock(%s, %s, %s)", data.address, vestingAmountWei, vestingTimestamp));
                fileLog.writeln(util.format("\ttransaction: %s", transferTx.tx));
            }

        };
    }
    catch(error) {
        console.log(error)
    }
    callback()
}
