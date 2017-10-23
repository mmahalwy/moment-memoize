const React = require('react');
const ReactDOM = require('react-dom/server');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const { configure, shallow } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const moment = require('moment');
const chalk = require('chalk');
const momentMemoize = require('../../src/index');
const setup = require('../../setup');

configure({ adapter: new Adapter() });

function DisplayDateComponent({ from, to }) {
  return (
    <div>
      {from} - {to}
    </div>
  );
}

(() => {
  setup.testName('App default');

  function DisplayDateComponent({ from, to, momentType }) {
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
      ReactDOM.renderToString(
        <App from={1318781876406} to={1318781886406} momentType={moment} />,
      );
    })
    .add('momentMemoize single element', function() {
      ReactDOM.renderToString(
        <App
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
      ReactDOM.renderToString(
        <App from={1318781876406} to={1318781886406} momentType={moment} />,
      );
    })
    .add('momentMemoize single element', function() {
      ReactDOM.renderToString(
        <App
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
      ReactDOM.renderToString(
        <App
          from={moment(1318781876406).format('LLLL')}
          to={moment(1318781886406).format('LLLL')}
        />,
      );
    })
    .add('momentMemoize single element', function() {
      ReactDOM.renderToString(
        <App
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
