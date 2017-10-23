const moment = require('moment');
const chalk = require('chalk');

const MOMENT_A = moment().subtract(1, 'day');
const MOMENT_B = moment().add(1, 'day');
const DATE_A = new Date();
const TIMES_TO_RUN = 1000;

const STATIC_METHODS_TESTS = [
  {
    method: 'unix',
    args: [1318781876],
  },
  {
    method: 'utc',
    args: [[2010, 1, 14, 15, 25, 50, 125]],
  },
  {
    method: 'parseZone',
    args: ['2013-01-01T00:00:00-13:00'],
  },
  {
    method: 'parseZone',
    args: ['2013-01-01T00:00:00-13:00', 'YYYY MM DD HH ZZ'],
  },
  {
    method: 'max',
    args: [MOMENT_A, MOMENT_B],
  },
  {
    method: 'min',
    args: [MOMENT_A, MOMENT_B],
  },
  {
    method: 'isMoment',
    args: [MOMENT_A],
  },
  {
    method: 'isDate',
    args: [DATE_A],
  },
  {
    method: 'months',
    args: [],
  },
  {
    method: 'monthsShort',
    args: [],
  },
  {
    method: 'weekdays',
    args: [],
  },
  {
    method: 'weekdaysShort',
    args: [],
  },
  {
    method: 'weekdaysMin',
    args: [],
  },
  {
    method: 'weekdays',
    args: [3],
  },
  {
    method: 'monthsShort',
    args: [],
  },
  {
    method: 'duration',
    args: [2, 'minutes'],
  },
  {
    method: 'duration',
    args: ['23:59:59'],
  },
  {
    method: 'duration',
    args: ['P1Y2M3DT4H5M6S'],
  },
];

const PARSING_TESTS = [
  {
    args: ['1995-12-25'],
  },
  {
    args: ['12-25-1995', 'MM-DD-YYYY'],
  },
  {
    args: ['12-25-1995', ['MM-DD-YYYY', 'YYYY-MM-DD']],
  },
  {
    args: ['2010-01-01T05:06:07', moment.ISO_8601],
  },
  {
    args: [{ hour: 15, minute: 10 }],
  },
  {
    args: [1318781876406],
  },
  {
    args: [DATE_A],
  },
  {
    args: [[2010, 1, 14, 15, 25, 50, 125]],
  },
  {
    args: ['/Date(1198908717056-0700)/'],
  },
];

const CHAINING_METHOD_TESTS = [
  {
    method: 'fromNow',
    args: [],
  },
  {
    method: 'from',
    args: [[2007, 0, 29]],
  },
  {
    method: 'toNow',
    args: [],
  },
  {
    method: 'calendar',
    args: [],
  },
  {
    method: 'toDate',
    args: [],
  },
  {
    method: 'daysInMonth',
    args: [],
  },
  {
    method: 'toJSON',
    args: [],
  },
  {
    method: 'toObject',
    args: [],
  },
  {
    method: 'toString',
    args: [],
  },
  {
    method: 'isBefore',
    args: [MOMENT_A],
  },
  {
    method: 'isSame',
    args: [MOMENT_A],
  },
  {
    method: 'isAfter',
    args: [MOMENT_A],
  },
  {
    method: 'isSameOrBefore',
    args: [MOMENT_A],
  },
  {
    method: 'isSameOrAfter',
    args: [MOMENT_A],
  },
  {
    method: 'isBetween',
    args: [MOMENT_A, MOMENT_B],
  },
  {
    method: 'isLeapYear',
    args: [],
  },
  {
    method: 'minute',
    args: [],
  },
];

exports.MOMENT_A = MOMENT_A;
exports.MOMENT_B = MOMENT_B;
exports.DATE_A = DATE_A;
exports.TIMES_TO_RUN = TIMES_TO_RUN;
exports.STATIC_METHODS_TESTS = STATIC_METHODS_TESTS;
exports.PARSING_TESTS = PARSING_TESTS;
exports.CHAINING_METHOD_TESTS = CHAINING_METHOD_TESTS;
exports.testName = name => console.log(chalk.blue.bold(name));
