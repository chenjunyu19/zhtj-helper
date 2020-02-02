'use strict';

const https = require('https');
const path = require('path');
const querystring = require('querystring');

let mtuanapi;

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
            const url = new URL(this.prefix + path);
            url.search = querystring.stringify(options);
            https.get(url, { headers: { cookie: mtuanapi.cookie || '' } }, (res) => {
                if (res.headers['set-cookie']) {
                    mtuanapi.cookie = res.headers['set-cookie'];
                }
                let data = Buffer.alloc(0);
                res.on('data', (chunk) => {
                    data = Buffer.concat([data, chunk]);
                });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(JSON.parse(data));
                    } else {
                        throw `[${res.statusCode}] ${url}`;
                    }
                });
            });
        });
    }
}

module.exports = API;
