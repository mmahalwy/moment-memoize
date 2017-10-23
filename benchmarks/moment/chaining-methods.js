const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const moment = require('moment');
const momentMemoize = require('../../src/index');
const setup = require('../setup');

setup.CHAINING_METHOD_TESTS.forEach(propertyTest => {
  const suite = new Benchmark.Suite();

  suite
    .add(`moment chaining ${propertyTest.method}`, function() {
      const momentObject = moment('12-25-1995', 'MM-DD-YYYY');
      momentObject[propertyTest.method](...propertyTest.args);
    })
    .add(`momentMemoize chaining ${propertyTest.method}`, function() {
      const momentMemoizeObject = momentMemoize('12-25-1995', 'MM-DD-YYYY');
      momentMemoizeObject[propertyTest.method](...propertyTest.args);
    })
    // add listeners
    .on('cycle', function(event) {
      benchmarks.add(event.target);
    })
    .on('complete', function() {
      benchmarks.log();
    })
    .run();
});

const suite = new Benchmark.Suite();

suite
  .add(`moment chainging overall`, function() {
    setup.CHAINING_METHOD_TESTS.forEach(propertyTest => {
      const momentObject = moment('12-25-1995', 'MM-DD-YYYY');
      momentObject[propertyTest.method](...propertyTest.args);
    });
  })
  .add(`momentMemoize chainging overall`, function() {
    setup.CHAINING_METHOD_TESTS.forEach(propertyTest => {
      const momentMemoizeObject = momentMemoize('12-25-1995', 'MM-DD-YYYY');
      momentMemoizeObject[propertyTest.method](...propertyTest.args);
    });
  })
  // add listeners
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('complete', function() {
    benchmarks.log();
  })
  .run();
