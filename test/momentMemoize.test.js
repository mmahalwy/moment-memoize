const moment = require('moment');
const momentMemoize = require('../../src/index');
const setup = require('../setup');

describe('static methods', () => {
  setup.STATIC_METHODS_TESTS.forEach(propertyTest => {
    test(`momentMemoize.${propertyTest.method} - ${propertyTest.args}`, () => {
      expect(moment[propertyTest.method](...propertyTest.args)).toEqual(
        momentMemoize[propertyTest.method](...propertyTest.args),
      );
    });
  });
});

describe('parsing', () => {
  setup.PARSING_TESTS.forEach(propertyTest => {
    test(`momentMemoize parsing ${propertyTest.args}`, () => {
      expect(
        moment(...propertyTest.args).isSame(
          momentMemoize(...propertyTest.args),
        ),
      ).toEqual(true);
    });
  });
});

describe('chaining', () => {
  setup.CHAINING_METHOD_TESTS.forEach(propertyTest => {
    test(`momentMemoize chaining ${propertyTest.args}`, () => {
      const momentObject = moment('12-25-1995', 'MM-DD-YYYY');
      const momentMemoizeObject = momentMemoize('12-25-1995', 'MM-DD-YYYY');

      expect(momentObject[propertyTest.method](...propertyTest.args)).toEqual(
        momentMemoizeObject[propertyTest.method](...propertyTest.args),
      );
    });
  });
});
