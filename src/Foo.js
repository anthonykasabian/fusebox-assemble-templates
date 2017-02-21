import * as path from 'path';

export class Foo {
    constructor() {}

    getSomething() {
        return path.join('a', 'b', 'c', 'and a d');
    }
}