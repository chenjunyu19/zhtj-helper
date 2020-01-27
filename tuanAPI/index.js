'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 返回 API 文件级别
 * @param {number} filename
 */
function getLevel(filename) {
    const basename = path.basename(filename, '.js');
    let level = 0;
    if (basename !== 'index') {
        level += basename.split('_').length;
    }
    return level;
}

module.exports = class tuanAPI {
    constructor(cookie) {
        this.cookie = cookie;
        this.loadNext(__filename, this);
    }

    loadNext(filename, api) {
        const basename = path.basename(filename, '.js');
        const level = getLevel(basename);
        for (const dirent of fs.readdirSync(__dirname, { withFileTypes: true })) {
            if (dirent.isFile() && path.extname(dirent.name) === '.js') {
                if (getLevel(dirent.name) === level + 1 && (level || dirent.name !== 'index.js' && dirent.name !== 'API.js')) {
                    const direntBasename = path.basename(dirent.name, '.js');
                    if (!level || direntBasename.startsWith(basename)) {
                        api[direntBasename.split('_')[level]] = new (require(path.join(__dirname, dirent.name)))(this);
                    }
                }
            }
        }
    }
};
