'use strict';

const API = require('./API');
const statisticsResult = require('./bg_orgStatistics_statisticsResult');

class orgStatistics extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }

    statisticsResult = new statisticsResult(this.tuanapi);
}

module.exports = orgStatistics;
