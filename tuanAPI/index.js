'use strict';

const login = require('./login');
const bg = require('./bg');

module.exports = class tuanAPI {
    constructor(cookie) {
        this.cookie = cookie;
    }

    login = new login(this);
    bg = new bg(this);
};
