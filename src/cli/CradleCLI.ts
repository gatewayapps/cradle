#!/usr/bin/env node

import program from 'commander'
const packageInfo = require('../../package.json')

function collect(val: any, memo: any) {
    memo.push(val)
    return memo
  }

program
    .version(packageInfo.version)
    .command('verify', 'verify a cradle input')
    .parse(process.argv)
