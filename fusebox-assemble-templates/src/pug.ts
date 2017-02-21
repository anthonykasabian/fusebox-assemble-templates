'use strict';

const path = require('path');
const fs = require('fs');
const mkdirs = require('./mkdirs').mkdirs;
const Config = require('fuse-box/dist/commonjs/Config');
const File = require('fuse-box/dist/commonjs/File');
const WorkflowContext = require('fuse-box/dist/commonjs/WorkflowContext');
const Plugin = require('fuse-box/dist/commonjs/WorkflowContext');
const utils = require('realm-utils');

export class TemplateCompilerClass implements Plugin {
    
}