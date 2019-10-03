'use strict';

const https = require('https');

/**
 * 将选项追加为 GET 请求参数
 * @param {string} path 路径
 * @param {Object} options 选项
 */
function joinOptions(path, options) {
    for (const option in options) {
        path += `${path.includes('?') ? '&' : '?'}${option}=${options[option]}`;
    }
    return path;
}

class API {
    prefix;

    constructor(tuanapi) {
        this.tuanapi = tuanapi;
    }

    getAPI(path, options) {
        if (!options) {
            options = {};
        }
        options._ = Date.now();
        return new Promise((resolve) => {
            https.get(this.prefix + joinOptions(path, options), { headers: { cookie: this.tuanapi.cookie || '' } }, (res) => {
                if (res.headers["set-cookie"]) {
                    this.tuanapi.cookie = res.headers["set-cookie"];
                }
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
        });
    }
}

module.exports = API;
