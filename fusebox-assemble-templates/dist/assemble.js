"use strict";
var fs = require("fs");
var path = require("path");
var mkdirs = require('./mkdirs');
var TemplateCompiler = (function () {
    function TemplateCompiler(options) {
        this.test = /.pug$/;
        //this.test = /.hbs$/;
        this.root = require('app-root-path').path;
        //this.inner = assemble();
        this.inner = require('pug');
        this.ignore_pattern = /_*\.*/;
        if (options) {
            this.pug_options = options.pug || {};
        }
    }
    TemplateCompiler.prototype.init = function (context) {
        context.allowExtension('.pug');
        this.out_dir = path.join(this.root, path.dirname(context.outFile));
        if (!fs.existsSync(this.out_dir)) {
            fs.mkdirSync(this.out_dir);
        }
    };
    TemplateCompiler.prototype.transform = function (file) {
        if (file.collection.name === file.context.defaultPackageName) {
            file.loadContents();
            var parsed_hbs_1 = {
                //content: this.inner.src(file.contents).pipe(this.inner.renderFile()),
                content: this.inner.render(file.contents, this.pug_options),
                path: path.join(this.out_dir, file.info.fuseBoxPath.replace(/\..*$/, '.html'))
            };
            file.content = '';
            return mkdirs(path.dirname(parsed_hbs_1.path)).then(function () { return new Promise(function (resolve, reject) {
                fs.writeFile(parsed_hbs_1.path, parsed_hbs_1.content, function (error) {
                    if (error)
                        reject(error);
                    else
                        (resolve);
                });
            }); });
        }
    };
    return TemplateCompiler;
}());
module.exports = function (options) { return new TemplateCompiler(options); };
//# sourceMappingURL=assemble.js.map