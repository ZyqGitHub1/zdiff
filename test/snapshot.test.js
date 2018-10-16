'use strict';

const { Snapshot: Snapshot } = require('../index');

test('takeSnapshot return deepClone of source', () => {
    const source = {
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

    const snapshot = new Snapshot(source);
    const snapshot1 = snapshot.takeSnapshot();

    expect(snapshot1).toEqual(source);
});

test('getSnapshot return deepClone of source', () => {
    const source = {
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

    const snapshot = new Snapshot(source);
    snapshot.takeSnapshot();
    const snapshot1 = snapshot.getSnapshot();

    expect(snapshot1).toEqual(source);
});

test('getSnapshot return deepClone of source', () => {
    const source = {
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

    const snapshot = new Snapshot(source);
    snapshot.takeSnapshot();
    source.a = '111';
    source.b = {
        a: 1,
        b: 2
    };
    source.c = [1, 2, 3, 'a'];
    source.d = 123;
    source.e = [
        {
            a: 1
        },
        {
            b: '2'
        }
    ];
    const patch = snapshot.getDiffPatch();

    expect(patch).toEqual({
        a: '111',
        b: {
            a: 1,
            b: 2
        },
        c: [1, 2, 3, 'a'],
        d: 123,
        e: [
            {
                a: 1
            },
            {
                b: '2'
            }
        ]
    });
});
