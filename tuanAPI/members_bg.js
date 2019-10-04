'use strict';

const API = require('./API');

class bg extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }

    /**
     * 查询我的团员
     * @param {Object} options 查询选项 page, rows, name, auditStatus, rewardStatus, deletedState, mobile, disabled, developmentMemberNumber, leagueForYears
     */
    async list(options) {
        return await this.getAPI('/list', options);
    }
}

module.exports = bg;
