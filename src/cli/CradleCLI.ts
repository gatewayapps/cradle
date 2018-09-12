#!/usr/bin/env node
import { red } from 'colors'
import program from 'commander'
import fs from 'fs'
import path from 'path'
import CradleConfig from '../lib/CradleConfig'
import emit from './CradleCLI-emit'
import verify from './CradleCLI-verify'
const packageInfo = require('../../package.json')

function collect(val: any, memo: any) {
    memo.push(val)
    return memo
  }
try {
program
    .version(packageInfo.version)
    .command('verify', 'verify a cradle loader')
    .command('emit', 'run an emitter configuration')
    .option('-e, --emitter [name]', 'emitter configuration name or * for all')
    .option('-c, --config [path]', 'path to a cradle config file')
    .action((cmd, options) => {
      let cradleConfig: CradleConfig | undefined
      if (options.config) {
        const finalPath = path.join(process.cwd(), options.config)
        if (fs.existsSync(finalPath)) {
          cradleConfig = require(finalPath)
          if (cradleConfig instanceof CradleConfig === false) {
            throw new Error(`Cradle config must export an instance of new CradleConfig`)
          }
        } else {
          throw new Error('Cradle config file not found')
        }

      }
      if (cradleConfig) {
      switch (cmd) {
        case 'verify': {
          verify(cradleConfig.Loader)
          break
        }
        case 'emit': {
          const emitter = cradleConfig.Emitters.find((e) => e.name === options.emitter)
          if (emitter) {
            emit(cradleConfig.Loader, emitter)
          } else {
            throw new Error(`Invalid emitter name ${options.emitter}`)
          }
          break
        }
      }
    }

    })

program.parse(process.argv)
  } catch (err) {
    console.error(red(err.message))
  }
