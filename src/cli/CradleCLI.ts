#!/usr/bin/env node

import program from 'commander'
const packageInfo = require('../../package.json')


program
    .version(packageInfo.version)
    

export class CradleCLI {
    static log(message: String) {
        console.log(message)
    }
}

CradleCLI.log('testing')