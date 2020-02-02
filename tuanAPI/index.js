'use strict';

const fs = require('fs');
const path = require('path');
const filesToLoad = [];

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
        for (const dirent of fs.readdirSync(__dirname, { withFileTypes: true })) {
            if (dirent.isFile() && path.extname(dirent.name) === '.js' && dirent.name !== 'index.js' && dirent.name !== 'API.js') {
                filesToLoad.push(dirent.name);
            }
        }
        this.loadNext(__filename, this);
    }

    loadNext(filename, api) {
        const basename = path.basename(filename, '.js');
        const level = getLevel(basename);
        for (const fileToLoad of filesToLoad) {
            if (getLevel(fileToLoad) === level + 1) {
                const fileToLoadBasename = path.basename(fileToLoad, '.js');
                if (!level || fileToLoadBasename.startsWith(basename)) {
                    api[fileToLoadBasename.split('_')[level]] = new (require(path.join(__dirname, fileToLoad)))(this, fileToLoad);
                }
            }
        }
    }
};
