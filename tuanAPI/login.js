'use strict';

const API = require('./API');

class login extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }

    /**
     * 登录
     * @param {string} userName 用户名
     * @param {string} password 密码
     */
    async adminLogin(userName, password) {
        return await this.getAPI(`/adminLogin?userName=${userName}&password=${password}`);
    }

    /**
     * 获取帐号信息
     */
    async getSessionAccount() {
        return await this.getAPI('/getSessionAccount');
    }
}

module.exports = login;
