'use strict';

const https = require('https');
const path = require('path');

let mtuanapi;

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
    constructor(tuanapi, filename) {
        if (!mtuanapi) {
            mtuanapi = tuanapi;
        }
        this.prefix = 'https://tuanapi.12355.net/' + path.basename(filename, '.js').replace(/_/g, '/');
        tuanapi.loadNext(filename, this);
    }

    getAPI(path, options) {
        if (!options) {
            options = {};
        }
        options._ = Date.now();
        return new Promise((resolve) => {
            https.get(this.prefix + joinOptions(path, options), { headers: { cookie: mtuanapi.cookie || '' } }, (res) => {
                if (res.headers['set-cookie']) {
                    mtuanapi.cookie = res.headers['set-cookie'];
                }
                let data = Buffer.alloc(0);
                res.on('data', (chunk) => {
                    data = Buffer.concat([data, chunk]);
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
        });
    }
}

module.exports = API;
