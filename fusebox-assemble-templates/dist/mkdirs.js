'use strict';
var path = require('path');
var fs = require('fs');
function is_dir(pat) {
    return new Promise(function (resolve, reject) {
        fs.stat(pat, function (err, stat) {
            if (err) {
                if (err.code === 'ENOENT')
                    resolve(false);
                else
                    reject(err);
            }
            else
                resolve(stat.isDirectory());
        });
    });
}
function mkdirs(pat) {
    return is_dir(pat).then(function (dir) {
        if (!dir) {
            return mkdirs(path.dirname(pat)).then(function () { return new Promise(function (resolve, reject) {
                fs.mkdir(pat, function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            }); });
        }
        else {
            return new Promise(function (resolve) { return resolve(); });
        }
    });
}
module.exports.is_dir = is_dir;
module.exports.mkdirs = mkdirs;
//# sourceMappingURL=mkdirs.js.map