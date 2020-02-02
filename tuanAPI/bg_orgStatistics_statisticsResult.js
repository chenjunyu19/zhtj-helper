'use strict';

module.exports = class statisticsResult extends require('./API') {
    async list() {
        return await this.getAPI('/list');
    }
};
