'use strict';

module.exports = class login extends require('./API') {
    /**
     * 登录
     * @param {string} userName 用户名
     * @param {string} password 密码
     */
    async adminLogin(userName, password) {
        return await this.getAPI('/adminLogin', { userName, password });
    }

    /**
     * 获取帐号信息
     */
    async getSessionAccount() {
        return await this.getAPI('/getSessionAccount');
    }
};
