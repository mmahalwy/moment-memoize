const React = require('react');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const moment = require('moment');
const chalk = require('chalk');
const momentMemoize = require('../../src/index');
const setup = require('../../setup');

function DisplayDateComponent({ from, to }) {
  const type = types[momentType];

  return (
    <div>
      {from} - {to}
    </div>
  );
}

(() => {
  setup.testName('App default');

  function DisplayDateComponent({ from, to, momentType }) {
    const type = types[momentType];

    return (
      <div>
        {momentType(from).format('LLLL')} - {momentType(to).format('LLLL')}
      </div>
    );
  }

  function App({ from, to, momentType }) {
    return (
      <div>
        <DisplayDateComponent from={from} to={to} momentType={momentType} />
        <DisplayDateComponent from={from} to={to} momentType={momentType} />
        <DisplayDateComponent from={from} to={to} momentType={momentType} />
        <DisplayDateComponent from={from} to={to} momentType={momentType} />
        <DisplayDateComponent from={from} to={to} momentType={momentType} />
      </div>
    );
  }

  const suite = new Benchmark.Suite();

  suite
    .add('moment single element', function() {
      <App from={1318781876406} to={1318781886406} momentType={moment} />;
    })
    .add('momentMemoize single element', function() {
      <App
        from={1318781876406}
        to={1318781886406}
        momentType={momentMemoize}
      />;
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
  setup.testName('App creating moment props');

  function App({ from, to, momentType }) {
    const fromMoment = momentType(from).format('LLLL');
    const toMoment = momentType(to).format('LLLL');

    return (
      <div>
        <DisplayDateComponent from={fromMoment} to={toMoment} />
        <DisplayDateComponent from={fromMoment} to={toMoment} />
        <DisplayDateComponent from={fromMoment} to={toMoment} />
        <DisplayDateComponent from={fromMoment} to={toMoment} />
        <DisplayDateComponent from={fromMoment} to={toMoment} />
      </div>
    );
  }

  const suite = new Benchmark.Suite();

  suite
    .add('moment single element', function() {
      <App from={1318781876406} to={1318781886406} momentType={moment} />;
    })
    .add('momentMemoize single element', function() {
      <App
        from={1318781876406}
        to={1318781886406}
        momentType={momentMemoize}
      />;
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
  setup.testName('App passing moment props');

  function App({ from, to, momentType }) {
    return (
      <div>
        <DisplayDateComponent from={from} to={to} />
        <DisplayDateComponent from={from} to={to} />
        <DisplayDateComponent from={from} to={to} />
        <DisplayDateComponent from={from} to={to} />
        <DisplayDateComponent from={from} to={to} />
      </div>
    );
  }

  const suite = new Benchmark.Suite();

  suite
    .add('moment single element', function() {
      <App
        from={moment(1318781876406).format('LLLL')}
        to={moment(1318781886406).format('LLLL')}
      />;
    })
    .add('momentMemoize single element', function() {
      <App
        from={momentMemoize(1318781876406).format('LLLL')}
        to={momentMemoize(1318781886406).format('LLLL')}
      />;
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
