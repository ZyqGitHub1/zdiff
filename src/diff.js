'use strict';

const _reduce = require('lodash/reduce');
const _isEqual = require('lodash/isEqual');

function diff(source, other) {
    return _reduce(
        source,
        (result, value, key) => {
            if (!_isEqual(value, other[key])) {
                result.push(key);
                return result;
            }
            return result;
        },
        []
    );
}

function getPatchProps(source, props) {
    return _reduce(
        props,
        (result, value) => {
            if (Reflect.has(source, value)) {
                Reflect.set(result, value, Reflect.get(source, value));
                return result;
            }
            return result;
        },
        {}
    );
}

function createDiffPatch(source, other) {
    const diffProps = diff(source, other);
    return getPatchProps(other, diffProps);
}

module.exports = {
    diff,
    getPatchProps,
    createDiffPatch
};
