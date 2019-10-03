'use strict';

const API = require('./API');
const orgStatistics = require('./bg_orgStatistics');

class bg extends API {
    prefix = 'https://tuanapi.12355.net/bg';

    orgStatistics = new orgStatistics(this.tuanapi);

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
        return await this.getAPI('/getPaymentStatisticsDetails', options);
    }
}

module.exports = bg;
