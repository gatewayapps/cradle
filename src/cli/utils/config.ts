import fs from 'fs'
import path from 'path'
import { CradleConfig } from '../../lib/CradleConfig'

export async function loadConfiguration(configFile: string): Promise<CradleConfig> {
  configFile = configFile || './cradle.config.js'
  const finalPath = path.join(process.cwd(), configFile)
  if (fs.existsSync(finalPath)) {
    console.log('path exists!')
    console.log('finalPath is', finalPath)
    try {
      const cradleConfig = require(finalPath)
      console.log('required cradleConfig')
      if (cradleConfig instanceof CradleConfig === false) {
        throw new Error(`Cradle config must export an instance of new CradleConfig`)
      }
      return cradleConfig
    } catch (err) {
      console.log(err)
      throw err
    }
  } else {
    throw new Error('Cradle config file not found')
  }
}
