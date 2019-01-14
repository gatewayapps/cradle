import colors from 'colors'
import { getEmitter, getLoader } from '../../lib/CradleUtils'
import { loadConfiguration } from '../utils/config'

export const command = 'emit [config]'

export const desc = 'Loads a Cradle schema and writes it out using emitters'

export const builder = {
  config: {
    alias: ['c'],
    default: './cradle.config.js',
    demandOption: false,
    describe: 'path to a cradle config file'
  },
  emit: {
    alias: ['e'],
    demandOption: false,
    describe: 'emitter configuration name or * for all'
  }
}

export async function handler(argv) {
  try {
    const configuration = loadConfiguration(argv.config)
    if (configuration) {
      const loader = await getLoader(configuration.Loader)
      const schema = await loader.loadSchema()

      const emitters = argv.emit ? configuration.Emitters.filter((e) => e.name === argv.emit) : configuration.Emitters
      await Promise.all(
        emitters.map(async (em) => {
          const emitter = await getEmitter(em)
          await emitter.emitSchema(schema)
        })
      )
    }
  } catch (err) {
    console.log(colors.red(err.message))
    console.log(colors.yellow(err.stack))
    process.exit(1)
  }
}
