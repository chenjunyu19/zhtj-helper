'use strict';

const login = require('./login');
const bg = require('./bg');
const members = require('./members');

module.exports = class tuanAPI {
    constructor(cookie) {
        this.cookie = cookie;
    }

    login = new login(this);
    bg = new bg(this);
    members = new members(this);
};
