import tpl from './views/html5.html';
import {Foo} from './Foo';
require('./style.scss');

class HelloWorld extends Foo {
    constructor() {
        super();
        console.log('jahoo dude number 2' + this.getSomething());
    }
}

new HelloWorld();