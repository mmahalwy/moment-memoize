const moment = require('moment');
const memoize = require('memoizee');

function memoizeObjectMethods(initial, from) {
  for (const property in from) {
    if (typeof from[property] === 'function') {
      initial[property] = memoize(from[property], { length: false });
    } else {
      initial[property] = from[property];
    }
  }
}

// TODO: no args needs to be dynamic!
const momentMemoize = memoize(moment, { length: false });

// Memoize all static methods
memoizeObjectMethods(momentMemoize, moment);

module.exports = momentMemoize;

// NOTES

// Handle chainging
// eg. `moment.duration(1, "minutes").humanize();`

// Potentially to whitelist
// - updateLocale
// - locale
// - lang
// - calendarFormat
// - relativeTimeThreshold
// - relativeTimeRounding
// - normalizeUnits
