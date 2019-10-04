'use strict';

const API = require('./API');
const bg = require('./members_bg');

class members extends API {
    constructor(tuanapi) {
        super(tuanapi, __filename);
    }

    bg = new bg(this.tuanapi);
}

module.exports = members;
