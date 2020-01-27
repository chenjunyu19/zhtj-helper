'use strict';

const API = require('./API');

class orgStatistics extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }
}

module.exports = orgStatistics;
