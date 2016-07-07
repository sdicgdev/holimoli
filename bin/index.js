#!/usr/bin/env node
import { List, Map } from 'immutable'

import get_holidays, { WHITELIST, DATE_FORMAT, format_dates } from '../index';
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));
const current_year = new Date().getFullYear()

if(argv.h || argv.help){
  console.log(`
    --output\t\tabsolute path to file\tdefault=console.log
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


get_holidays(year, whitelist)
  .then(result => {
    const text = JSON.stringify(format_dates(result, date_format), null, '\t')
    if(output_file) {
      fs.writeFileSync(output_file, text);
      if(!argv.quiet && !argv.q) console.log(`output written to ${output_file}`)
    }else{
      console.log(text);
    }
  })
.catch(e =>{
  console.log(e);
  process.exit(1);
});


