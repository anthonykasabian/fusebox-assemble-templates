"use strict";
var path = require('path');
var fs = require('fs');
var mkdirs = require('./mkdirs').mkdirs;
var Config = require('fuse-box/dist/commonjs/Config');
var File = require('fuse-box/dist/commonjs/File');
var WorkflowContext = require('fuse-box/dist/commonjs/WorkflowContext');
var Plugin = require('fuse-box/dist/commonjs/WorkflowContext');
var utils = require('realm-utils');
var TemplateCompilerClass = (function () {
    function TemplateCompilerClass() {
    }
    return TemplateCompilerClass;
}());
exports.TemplateCompilerClass = TemplateCompilerClass;
//# sourceMappingURL=index.js.map