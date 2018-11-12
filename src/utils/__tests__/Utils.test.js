var assert = require('assert');

import { isObjectTruthy, isObjectEmpty } from "../Utils";


describe('isObjectTruthy check', function() {
 
    it('should return `false` for `null` ', function() {
      assert.equal(isObjectTruthy(null), false);
    });

    it('should return `false` for `{}` ', function() {
      assert.equal(isObjectTruthy({}), false);
    });

    it('should return `false` for `{a: false}` ', function() {
      assert.equal(isObjectTruthy({a: false}), false);
    });

    it('should return `false` for `{a: "a"}` ', function() {
      assert.equal(isObjectTruthy({a: "a"}), true);
    });
});

describe('isObjectEmpty check', function() {
 
  it('should return `true` for `null` ', function() {
    assert.equal(isObjectEmpty(null), true);
  });

  it('should return `true` for `{}` ', function() {
    assert.equal(isObjectEmpty({}), true);
  });

  it('should return `true` for `{a: "a"}` ', function() {
    assert.equal(isObjectEmpty({a: "a"}), false);
  });
});