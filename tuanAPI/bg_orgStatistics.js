'use strict';

const API = require('./API');
const statisticsResult = require('./bg_orgStatistics_statisticsResult');

class orgStatistics extends API {
    prefix = 'https://tuanapi.12355.net/bg/orgStatistics';

    statisticsResult = new statisticsResult(this.tuanapi);
}

module.exports = orgStatistics;
