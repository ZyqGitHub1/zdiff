'use strict';

const _cloneDeep = require('lodash/cloneDeep');
const {
    createDiffPatch
} = require('./diff');

class Snapshot {
    constructor(source) {
        this._source = source;
        this._snapshots = [];
        this._tail = -1;
    }

    takeSnapshot() {
        const snapshot = _cloneDeep(this._source);
        this._snapshots.push(snapshot);
        this._tail++;
        return snapshot;
    }

    getSnapshot(index = this._tail) {
        return this._snapshots[index];
    }

    getDiffPatch(source = this._snapshots[this._tail], other = this._source){
        return createDiffPatch(source, other);
    }
}

module.exports = Snapshot;
