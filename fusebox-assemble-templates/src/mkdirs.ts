'use strict';

const path = require('path');
const fs = require('fs');

function is_dir(pat) {
    return new Promise((resolve, reject) => {
        fs.stat(pat, (err, stat) => {
            if (err) {
                if (err.code === 'ENOENT') resolve(false);
                else reject(err);
            }
            else resolve(stat.isDirectory());
        });
    });
}

function mkdirs(pat) {
    return is_dir(pat).then((dir) => {
        if (!dir) {
            return mkdirs(path.dirname(pat)).then(() => new Promise((resolve, reject) => {
                fs.mkdir(pat, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            }));
        }
        else {
            return new Promise((resolve) => resolve());
        }
    });
}

module.exports.is_dir = is_dir;
module.exports.mkdirs = mkdirs;