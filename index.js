import axios from 'axios';
import { List, Map } from 'immutable';
import moment from 'moment';

export const WHITELIST = List([
  "New Year's Eve",
  "Christmas",
  "Christmas Eve",
  "Thanksgiving Day",
  "Veterans Day",
  "Election Day",
  "Halloween",
  "Columbus Day",
  "Labor Day",
  "Independence Day",
  "Memorial Day",
  "Earth Day",
  "Easter",
  "Good Friday",
  "Saint Patrick's Day",
  "Valentine's Day",
  "Groundhog Day",
  "Martin Luther King, Jr. Day",
  "New Year's Day"
]);

export const DATE_FORMAT = 'MM/DD/YYYY';

export default function get_holidays(year=2016, whitelist=WHITELIST){
  return axios(`https://holidayapi.com/v1/holidays?country=US&year=${year}`)
          .then(result => {
            if(result.status===200) return gather(whitelist, Map(result.data.holidays));
            throw new Error(result);
          })
}

export function format_dates(holidays, date_format=DATE_FORMAT){
  return holidays.map(day => day.set('date', moment(day.date).format(date_format)))
}

function gather(whitelist, holidays){
  return holidays.reduce((important_days, holidays, day) => {
    return important_days.push(...whitelisted(whitelist, List(holidays)));
  }, List())
  .map(day => Map({name: day.name,date: new Date(day.date)})) 
  .sortBy(day => day.get('date'))
}

function whitelisted(whitelist, holidays){
  return holidays
            .filter(day => whitelist.includes(day.name))

}

