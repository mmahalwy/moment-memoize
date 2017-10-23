const moment = require('moment');

const map = new Map();

const momentMemoize = function(...args) {
  const argsString = args.toString();
  console.log(map, 'hello');
  if (map.has(argsString)) {
    return map.get(argsString);
  }

  const momentInstance = moment(...args);

  map.set(argsString, momentInstance);

  for (const methodName in momentInstance) {
    if (typeof momentInstance[methodName] === 'function') {
      const wrap = method =>
        function(...methodArgs) {
          const methodArgsString = [...args, ...methodArgs].toString();
          if (map.has(methodArgsString)) {
            return map.get(methodArgsString);
          }

          const result = method.call(momentInstance, ...methodArgs);

          map.set(methodArgsString, result);

          return result;
        };

      momentInstance[methodName] = wrap(momentInstance[methodName]);
    }
  }

  return momentInstance;
};

module.exports = momentMemoize;
