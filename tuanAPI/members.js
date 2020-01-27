'use strict';

const API = require('./API');

class members extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }
}

module.exports = members;
