'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATE_FORMAT = exports.WHITELIST = undefined;
exports.default = get_holidays;
exports.format_dates = format_dates;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _immutable = require('immutable');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var WHITELIST = exports.WHITELIST = (0, _immutable.List)(["New Year's Eve", "Christmas", "Christmas Eve", "Thanksgiving Day", "Veterans Day", "Election Day", "Halloween", "Columbus Day", "Labor Day", "Independence Day", "Memorial Day", "Earth Day", "Easter", "Good Friday", "Saint Patrick's Day", "Valentine's Day", "Groundhog Day", "Martin Luther King, Jr. Day", "New Year's Day"]);

var DATE_FORMAT = exports.DATE_FORMAT = 'MM/DD/YYYY';

function get_holidays() {
  var year = arguments.length <= 0 || arguments[0] === undefined ? 2016 : arguments[0];
  var whitelist = arguments.length <= 1 || arguments[1] === undefined ? WHITELIST : arguments[1];

  return (0, _axios2.default)('https://holidayapi.com/v1/holidays?country=US&year=' + year).then(function (result) {
    if (result.status === 200) return gather(whitelist, (0, _immutable.Map)(result.data.holidays));
    throw new Error(result);
  });
}

function format_dates(holidays) {
  var date_format = arguments.length <= 1 || arguments[1] === undefined ? DATE_FORMAT : arguments[1];

  return holidays.map(function (day) {
    return day.set('date', (0, _moment2.default)(day.date).format(date_format));
  });
}

function gather(whitelist, holidays) {
  return holidays.reduce(function (important_days, holidays, day) {
    return important_days.push.apply(important_days, _toConsumableArray(whitelisted(whitelist, (0, _immutable.List)(holidays))));
  }, (0, _immutable.List)()).map(function (day) {
    return (0, _immutable.Map)({ name: day.name, date: new Date(day.date) });
  }).sortBy(function (day) {
    return day.get('date');
  });
}

function whitelisted(whitelist, holidays) {
  return holidays.filter(function (day) {
    return whitelist.includes(day.name);
  });
}