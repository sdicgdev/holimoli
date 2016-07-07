
Installation
------------

To use from command line

```
npm install holimoli -g
```

To use from a project

```
npm install holimoli --save-dev
```

Instructions
------------

```

$ > holimoli --help

  --output         relative path to file          default=console.log
  --year           4 digit year                   default=2016
  --whitelist      JSON array of holiday names
  --date-format    format date using moment.js    default='MM/DD/YYYY'

```

Examples
--------

all options can be used in conjunction with one another

export all of the holidays from the current year to a file called `holidays.json` in the current directory

```
$ > holimoli --output="./holidays.json"
```

export only halloween to ./halloween.json

```
$ > holimoli --whitelist='["Halloween"]' --output="./holidays.json"
```

only show month and day in date output, log to stdout. more options for formatting available at momentjs.com

```
$ > holimoli --date-format="MM/DD"
```

export holidays from a year other than the current year

```
$ > holimoli --year=2017
```
