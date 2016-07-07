#!/usr/bin/env node
import { List, Map } from 'immutable'
import moment from 'moment';

import get_holidays, { WHITELIST } from '../index';
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));
const current_year = new Date().getFullYear();
const DATE_FORMAT = 'MM/DD/YYYY';

if(argv.h || argv.help){
  console.log(`
    --output\t\trelative path to file\tdefault=console.log
    --year\t\t4 digit year\tdefault=${current_year}
    --whitelist\t\tJSON array of holiday names
    --date-format\t\tformat date using moment.js\tdefault='MM/DD/YYYY'
  `);

  process.exit();
}

const output_file = argv.output
const year        = argv.year||current_year;
const arg_list    = argv.whitelist && List(JSON.parse(argv.whitelist));
const whitelist   = arg_list||WHITELIST
const date_format = argv['date-format']||DATE_FORMAT

const reform_day  = (day) => Map({
  name: day.get('name'),
  date: moment(day.get('date')).format(date_format)
});

get_holidays(year, whitelist)
  .then(result => result.map(reform_day))
  .then(result => {
    const text = JSON.stringify(result, null, '\t')
    if(output_file) {
      fs.writeFileSync(`${process.cwd()}/${output_file}`, text);
      if(!argv.quiet && !argv.q) console.log(`output written to ${output_file}`)
    }else{
      console.log(text);
    }
  })
.catch(e =>{
  console.log(e);
  process.exit(1);
});


