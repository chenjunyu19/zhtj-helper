'use strict';

const https = require('https');

function getJSON(url, cookie) {
    return new Promise((resolve) => {
        https.get(`${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`, { headers: { cookie: cookie || '' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });
    });
}

/**
 * 将选项追加为 GET 请求参数
 * @param {string} path 路径
 * @param {Object} options 选项
 */
function joinOptions(path, options) {
    for (const option in options) {
        path += `${path.includes('?') ? '&' : '?'}${option}=${options[option]}`;
    }
    return path;
}

class API {
    prefix;

    constructor(tuanapi) {
        this.tuanapi = tuanapi;
    }

    async getAPI(path) {
        return await getJSON(this.prefix + path, this.tuanapi.cookie);
    }
}

class login extends API {
    prefix = 'https://tuanapi.12355.net/login';

    /**
     * 登录
     * @param {string} userName 用户名
     * @param {string} password 密码
     */
    adminLogin(userName, password) {
        return new Promise((resolve) => {
            https.get(`${this.prefix}/adminLogin?userName=${userName}&password=${password}&_=${Date.now()}`, (res) => {
                this.tuanapi.cookie = res.headers["set-cookie"];
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
        });
    }

    /**
     * 获取帐号信息
     */
    async getSessionAccount() {
        return await this.getAPI('/getSessionAccount');
    }
}

class bg extends API {
    prefix = 'https://tuanapi.12355.net/bg';

    /**
     * 查询团费统计详情
     * @param {Object} options 查询条件
     * 
     * pageNo 页码
     * 
     * pageSize 页面大小
     * 
     * oid 组织 ID
     * 
     * month 月份，YYYY-MM
     * 
     * status 状态，0 为未交，1为已交
     * 
     * mobile 手机号码
     */
    async getPaymentStatisticsDetails(options) {
        return await this.getAPI(joinOptions('/getPaymentStatisticsDetails', options));
    }
}

module.exports = class tuanAPI {
    constructor(cookie) {
        this.cookie = cookie;
    }

    login = new login(this);
    bg = new bg(this);
};
