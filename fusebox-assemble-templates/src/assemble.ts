import * as fs from 'fs'
import * as path from 'path';
import { File } from '~/File';
import { WorkflowContext } from '~/WorkflowContext';
import { Plugin } from '~/WorkflowContext';
import * as assemble from 'assemble';

const mkdirs = require('./mkdirs');

class TemplateCompiler {
  constructor(options) {
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

  init(context) {
    context.allowExtension('.pug');

    this.out_dir = path.join(this.root, path.dirname(context.outFile));

    if (!fs.existsSync(this.out_dir)) {
      fs.mkdirSync(this.out_dir);
    }
  }

  transform(file) {
    if(file.collection.name === file.context.defaultPackageName) {
      file.loadContents();

      const parsed_hbs = {
        //content: this.inner.src(file.contents).pipe(this.inner.renderFile()),
        content: this.inner.render(file.contents, this.pug_options),
        path: path.join(this.out_dir, file.info.fuseBoxPath.replace(/\..*$/, '.html'))
      };

      file.content = '';
      return mkdirs(path.dirname(parsed_hbs.path)).then(() => new Promise((resolve, reject) => {
        fs.writeFile(parsed_hbs.path, parsed_hbs.content, (error) => {
          if (error) reject(error);
          else (resolve);
        });
      }));
    }
  }
 }

 module.exports = (options) => new TemplateCompiler(options);