'use strict';

const fs = require('fs');
const path = require('path');
const tuanAPI = require('./tuanAPI');

const configFilePath = path.join(__dirname, 'config.json');

function readFileSyncSafe(path) {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, { encoding: 'utf-8' });
    }
}

function logStep(message) {
    console.log('\u001b[1m\u001b[34m::\u001b[0m\u001b[1m %s\u001b[0m', message);
}

async function main() {
    logStep('正在读取配置...');
    const config = JSON.parse(readFileSyncSafe(configFilePath)) || {};
    const tuanapi = new tuanAPI(config.cookie);

    logStep('正在验证登录信息...');
    let session = await tuanapi.login.getSessionAccount();
    while (session.status !== 'OK' || session.account.username !== config.username) {
        logStep('登录信息已失效，正在重新登录...');
        console.log(await tuanapi.login.adminLogin(config.username, config.password));;
        logStep('正在保存配置...');
        config.cookie = tuanapi.cookie;
        fs.writeFileSync(configFilePath, JSON.stringify(config, undefined, 4));
        logStep('正在验证登录信息...');
        session = await tuanapi.login.getSessionAccount();
    }
    console.log(session.account.name);

    logStep('正在获取统计数据');
    const statistics = (await tuanapi.bg.orgStatistics.statisticsResult.list()).data;
    console.log(statistics.leagueMember, '名团员');
    console.log(statistics.leagueReportMember, '份团员报到&资料修改审核');
    console.log(statistics.toexamineNumber, '份核组织关系转接待审');

    logStep('正在获取未交团费名单');
    let details = await tuanapi.bg.getPaymentStatisticsDetails({ pageSize: statistics.leagueMember, oid: session.account.oid, status: 0 });
    if (details.rows.length) {
        console.table(details.rows, ['memberName', 'fees', 'payStr']);
        if (config.genFeeMsg) {
            logStep('正在生成团费催交消息');
            let msg = '请以下同学尽快交纳团费：';
            for (const row of details.rows) {
                msg += `@${row.memberName} `;
            }
            msg += 'http://t.cn/RHjFAH7';
            console.log(msg);
        }
    } else {
        console.log('真棒，全部交完了！');
    }
}

main();
