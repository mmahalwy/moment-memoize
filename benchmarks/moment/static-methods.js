const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const moment = require('moment');
const momentMemoize = require('../../src/index');
const setup = require('../setup');

setup.STATIC_METHODS_TESTS.forEach(propertyTest => {
  const suite = new Benchmark.Suite(propertyTest.method);

  suite
    .add(`moment.${propertyTest.method}`, function() {
      moment[propertyTest.method](...propertyTest.args);
    })
    .add(`momentMemoize.${propertyTest.method}`, function() {
      momentMemoize[propertyTest.method](...propertyTest.args);
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

const suite = new Benchmark.Suite(propertyTest.method);

suite
  .add(`moment overall`, function() {
    setup.STATIC_METHODS_TESTS.forEach(propertyTest => {
      moment[propertyTest.method](...propertyTest.args);
    });
  })
  .add(`momentMemoize overall`, function() {
    setup.STATIC_METHODS_TESTS.forEach(propertyTest => {
      momentMemoize[propertyTest.method](...propertyTest.args);
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
