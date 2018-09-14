import colors from 'colors'
import { getLoader } from '../../lib/CradleUtils'
import { loadConfiguration } from '../utils/config'

export const command = 'verify [config]'

export const desc = 'Verifies a cradle schema based on the configuration'

export const builder = {
  config: {
    alias: ['c'],
    demandOption: true,
    describe: 'path to a cradle config file',
  }
}

export async function handler(argv) {
  try {
    const configuration = loadConfiguration(argv.config)
    if (configuration) {
      const loader = await getLoader(configuration.Loader)
      const schema = await loader.loadSchema()
      console.log(colors.yellow(JSON.stringify(schema, null, 2)))
      console.log(colors.green(`Schema verified`))
    }
  } catch (err) {
    console.log(colors.red(err.message))
    process.exit(1)
  }
}
