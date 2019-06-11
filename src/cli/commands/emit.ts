import colors from 'colors'
import { getEmitter, getLoader } from '../../lib/CradleUtils'
import { loadConfiguration } from '../utils/config'
import { EmitterDefinition } from '../../lib/EmitterConfiguration'

export const command = 'emit [config]'

export const desc = 'Loads a Cradle schema and writes it out using emitters'

export const builder = {
  config: {
    alias: ['c'],
    default: './cradle.yml',
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
    const configuration = await loadConfiguration(argv.config)
    if (configuration) {
      const loader = await getLoader(configuration.Loader)
      const schema = await loader.loadSchema()
      let emitters: EmitterDefinition[] = []
      if (argv.emit) {
        if (configuration.Emitters[argv.emit]) {
          emitters.push(configuration.Emitters[argv.emit])
        }
      } else {
        emitters = Object.values(configuration.Emitters)
      }

      await Promise.all(
        emitters.map(async (em) => {
          const emitter = await getEmitter(em)
          const finalSchema = emitter.applyExclusionsToSchema(schema)
          await emitter.emitSchema(finalSchema)
        })
      )
    }
  } catch (err) {
    console.log(colors.red(err.message))
    console.log(colors.yellow(err.stack))
    process.exit(1)
  }
}
