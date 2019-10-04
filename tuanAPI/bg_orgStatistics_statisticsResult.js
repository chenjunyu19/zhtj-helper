'use strict';

const API = require('./API');

class statisticsResult extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }

    async list() {
        return await this.getAPI('/list');
    }
}

module.exports = statisticsResult;
