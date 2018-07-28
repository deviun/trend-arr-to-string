const $Promise = require('bluebird');

// limit the numbers for one step
const STEP_LIMIT = 256;

/**
 * @class ArrReplacer
 * @description Replacer array of numbers to string
 */
class ArrReplacer {
  /**
   * @description Main replacer function
   * @param {Array} arr Array of numbers
   * @param {Number} stepLimit Limit the numbers for one step (by Default: STEP_LIMIT)
   */
  static async replace(arr = [], stepLimit = STEP_LIMIT) {
    if (!arr.length) {
      return '';
    }

    let offset = 0;
    let res = '';

    function _replace (resolve) {
      const chunk = arr.slice(offset, offset + stepLimit).join(',');

      res += res ? ',' + chunk : chunk;
      offset += stepLimit;

      if (offset >= arr.length) {
        return resolve();
      }

      setImmediate(_replace.bind(null, resolve));
    }

    await new $Promise((resolve) => setImmediate(_replace.bind(null, resolve)));
    return res;
  }
  /**
   * @description Description of the range of numbers in the array
   * @param {Array} arr
   */
  static async getRanges (arr) {
    const ranges = [];
    let offset = 0; // offset for slice arr
    let prev; // prev handled num

    function _getRange() {
      if (!ranges.length) {
        ranges.push([]);
      }

      return ranges[ranges.length - 1];
    }

    function _handleNum(resolve) {
      const range = _getRange();
      const num = arr.slice(offset, offset + 1)[0];

      if (offset >= arr.length) {
        return resolve();
      }

      ++offset;

      if (!prev) {
        range.push(num);
        prev = num;

        return setImmediate(_handleNum.bind(null, resolve));
      }

      if ((num - prev) === 1) {
        prev = num;

        return setImmediate(_handleNum.bind(null, resolve));
      }

      // close current range
      range[0] !== prev && range.push(prev);
      // start new range
      ranges.push([num]);

      prev = num;

      return setImmediate(_handleNum.bind(null, resolve));
    }

    await new $Promise((resolve) => {
      setImmediate(_handleNum.bind(null, resolve));
    });

    return ranges;
  }

  /**
   * @description Parse .getRanges result to string
   * @param {Array of Arrays} ranges 
   */
  static async arrRangesToString (ranges) {
    let offset = 0;
    let res = ''; // string ranges

    function _handleRange(resolve) {
      if (offset >= ranges.length) {
        return resolve();
      }

      const range = ranges.slice(offset, offset + 1)[0];

      res += res ? (',' + range.join('-')) : range.join('-');
      ++offset;

      return setImmediate(_handleRange.bind(null, resolve));
    }

    await new Promise((resolve) => {
      setImmediate(_handleRange.bind(null, resolve));
    });

    return res;
  }

  static async getStringRanges (arr) {
    const ranges = await this.getRanges(arr);

    return await this.arrRangesToString(ranges);
  }
}

module.exports = ArrReplacer;