const React = require('react');
const ReactDOM = require('react-dom/server');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const moment = require('moment');
const chalk = require('chalk');
const momentMemoize = require('../../src/index');
const setup = require('../../setup');

(() => {
  setup.testName('Default');

  function DisplayDateComponent({ from, to, momentType }) {
    return (
      <div>
        {momentType(from).format('LLLL')} - {momentType(to).format('LLLL')}
      </div>
    );
  }

  const suite = new Benchmark.Suite();

  suite
    .add('moment Single Element', function() {
      ReactDOM.renderToString(
        <DisplayDateComponent
          from={1318781876406}
          to={1318781886406}
          momentType={moment}
        />,
      );
    })
    .add('momentMemoize Single Element', function() {
      ReactDOM.renderToString(
        <DisplayDateComponent
          from={1318781876406}
          to={1318781886406}
          momentType={momentMemoize}
        />,
      );
    })
    // add listeners
    .on('cycle', function(event) {
      benchmarks.add(event.target);
    })
    .on('complete', function() {
      benchmarks.log();
    })
    .run();
})();

(() => {
  setup.testName('Computed moment outside of `return`');

  function DisplayDateComponent({ from, to, momentType }) {
    const fromMoment = momentType(from).format('LLLL');
    const toMoment = momentType(to).format('LLLL');

    return (
      <div>
        {fromMoment} - {toMoment}
      </div>
    );
  }

  const suite = new Benchmark.Suite();

  suite
    .add('moment Single Element', function() {
      ReactDOM.renderToString(
        <DisplayDateComponent
          from={1318781876406}
          to={1318781886406}
          momentType={moment}
        />,
      );
    })
    .add('momentMemoize Single Element', function() {
      ReactDOM.renderToString(
        <DisplayDateComponent
          from={1318781876406}
          to={1318781886406}
          momentType={momentMemoize}
        />,
      );
    })
    // add listeners
    .on('cycle', function(event) {
      benchmarks.add(event.target);
    })
    .on('complete', function() {
      benchmarks.log();
    })
    .run();
})();

(() => {
  setup.testName('Computed moment and passed as prop');

  function DisplayDateComponent({ from, to }) {
    return (
      <div>
        {from} - {to}
      </div>
    );
  }

  const suite = new Benchmark.Suite();

  suite
    .add('moment Single Element', function() {
      ReactDOM.renderToString(
        <DisplayDateComponent
          from={moment(1318781876406).format('LLLL')}
          to={moment(1318781886406).format('LLLL')}
        />,
      );
    })
    .add('momentMemoize Single Element', function() {
      ReactDOM.renderToString(
        <DisplayDateComponent
          from={momentMemoize(1318781876406).format('LLLL')}
          to={momentMemoize(1318781886406).format('LLLL')}
        />,
      );
    })
    // add listeners
    .on('cycle', function(event) {
      benchmarks.add(event.target);
    })
    .on('complete', function() {
      benchmarks.log();
    })
    .run();
})();
