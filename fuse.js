const fb = require('fuse-box');
const FuseBox = fb.FuseBox;
import * as hbs from ('./fusebox-assemble-templates/src/pug');

const fuse = FuseBox.init({
    homeDir: "src/",
    plugins: [
        [fb.SassPlugin(), fb.CSSPlugin()],
        fb.BabelPlugin(),
        hbs(),
        fb.HTMLPlugin({ useDefault: true })
    ],
    outFile: "./build/bundle.js",
});

fuse.devServer('> index.js [**/*.hbs]');