'use strict';

const API = require('./API');

class statisticsResult extends API {
    prefix = 'https://tuanapi.12355.net/bg/orgStatistics/statisticsResult';

    async list() {
        return await this.getAPI('/list');
    }
}

module.exports = statisticsResult;
