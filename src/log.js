const dateFormat = require('dateformat');
const util = require('util');

function log(message, ...params) {
  const time = dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss');
  const data = params.length ? util.inspect(params, { showHidden: false, depth: null }) : '';
  console.log(`[${time}] ${message}`, data);
}

module.exports = log;
