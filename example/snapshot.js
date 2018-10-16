'use strict';

/*eslint-disable no-console*/

const {
    Snapshot: Snapshot
} = require('../index');


const a = {
    a: 1,
    b: {
        a: 1
    },
    c: [1, 2, 3],
    d: '123',
    e: [
        {
            a: 1
        },
        {
            b: 2
        }
    ]
};

const snapshot = new Snapshot(a);
snapshot.takeSnapshot();
a.a = 'aaaa';
console.log(snapshot.getSnapshot());
console.log(snapshot.getDiffPatch());
