'use strict';

module.exports = class bg extends require('./API') {
    /**
     * 查询我的团员
     * @param {Object} options 查询选项 page, rows, name, auditStatus, rewardStatus, deletedState, mobile, disabled, developmentMemberNumber, leagueForYears
     */
    async list(options) {
        return await this.getAPI('/list', options);
    }
};
