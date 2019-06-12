import colors from 'colors'
import { getEmitter, getLoader, applyExclusionsToSchema } from '../../lib/CradleUtils'
import { loadConfiguration } from '../utils/config'
import { EmitterDefinition } from '../../lib/EmitterConfiguration'
import { execSync } from 'child_process'

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
        const emitterNames = Object.keys(configuration.Emitters)
        emitters = emitterNames.map((en) => configuration.Emitters[en])
      }

      await Promise.all(
        emitters.map(async (em) => {
          em.console = console
          const emitter = await getEmitter(em)
          const finalSchema = applyExclusionsToSchema(schema, em.options)

          await emitter.emitSchema(finalSchema)
          if (emitter.options.afterEmitCommand) {
            execSync(emitter.options.afterEmitCommand, { stdio: 'inherit' })
          }
        })
      )
    }
  } catch (err) {
    console.log(colors.red(err.message))
    console.log(colors.yellow(err.stack))
    process.exit(1)
  }
}
