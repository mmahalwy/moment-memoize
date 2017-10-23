const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const moment = require('moment');
const momentMemoize = require('../../src/index');
const setup = require('../../setup');

setup.PARSING_TESTS.forEach(propertyTest => {
  const suite = new Benchmark.Suite();

  suite
    .add(`moment parsing ${propertyTest.args}`, function() {
      moment(...propertyTest.args);
    })
    .add(`momentMemoize parsing ${propertyTest.args}`, function() {
      momentMemoize(...propertyTest.args);
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
  .add(`moment overall`, function() {
    setup.PARSING_TESTS.forEach(propertyTest => {
      moment(...propertyTest.args);
    });
  })
  .add(`momentMemoize overall`, function() {
    setup.PARSING_TESTS.forEach(propertyTest => {
      momentMemoize(...propertyTest.args);
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
