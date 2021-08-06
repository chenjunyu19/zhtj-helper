'use strict';

module.exports = class questionnaire extends require('./API') {
    /**
     * 获取青年大学习后台登录 URL
     */
    async getPcYouthLearningUrl() {
        return await this.getAPI('/getPcYouthLearningUrl');
    }
};
