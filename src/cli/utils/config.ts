import fs, { readFileSync } from 'fs'
import path from 'path'
import { CradleConfig, ICradleConfig } from '../../lib/CradleConfig'
import { safeLoad } from 'js-yaml'

export async function loadConfiguration(configFile: string): Promise<CradleConfig> {
  configFile = configFile || './cradle.yml'
  const finalPath = path.join(process.cwd(), configFile)
  if (fs.existsSync(finalPath)) {
    try {
      const cradleConfigContents = readFileSync(finalPath, 'utf8')

      const cradleConfigStruct: ICradleConfig = safeLoad(cradleConfigContents)
      if (!cradleConfigStruct.loader || !cradleConfigStruct.emitters) {
        throw new Error(`Cradle config must export an instance of new CradleConfig`)
      } else {
        const cradleConfig = new CradleConfig(
          cradleConfigStruct.loader,
          cradleConfigStruct.emitters,
          cradleConfigStruct.defaultOptions,
          cradleConfigStruct.typeMappings
        )
        return cradleConfig
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  } else {
    throw new Error('Cradle config file not found')
  }
}
