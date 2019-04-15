import { IEmitterOptions } from './EmitterOptions'
import ICradleEmitter, { ICradleEmitterConstructable } from './ICradleEmitter'
import ICradleLoader, { ICradleLoaderConstructable } from './ICradleLoader'
import LoaderOptions from './LoaderOptions'
import SpecEmitter from './SpecEmitter/SpecEmitter'
import SpecLoader from './SpecLoader/SpecLoader'

export async function getLoader(options: LoaderOptions): Promise<ICradleLoader> {
  let loader!: ICradleLoader
  if (typeof options.module === 'string') {
    if (options.module.toLowerCase() === 'spec') {
      // use cradle spec loader
      loader = new SpecLoader(options.options, options.console)
    } else {
      // TO-DO: handle other loaders here
      try {
        const loaderDef: ICradleLoaderConstructable = require(options.module)
        try {
          loader = new loaderDef(options.options, options.console)
        } catch (err) {
          return Promise.reject(
            `${options.module} module was found but a valid ICradleLoader is not the default export`
          )
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }
  } else {
    loader = options.module
  }
  if (loader.prepareLoader) {
    await loader.prepareLoader()
  }

  return loader
}

export async function getEmitter(options: IEmitterOptions): Promise<ICradleEmitter> {
  let emitter: ICradleEmitter

  if (!options.module) {
    throw new Error(
      `Expected an instance of IEmitterOptions, got: { ${Object.keys(options).join(', ')} }`
    )
  }
  if (typeof options.module === 'string') {
    if (!options.console) {
      throw new Error('You must pass a console argument if you are passing a module name')
    }
    if (options.module === 'spec') {
      emitter = new SpecEmitter(options.options, options.console!)
    } else {
      try {
        const EmitterDef: ICradleEmitterConstructable = require(options.module)

        try {
          emitter = new EmitterDef(options.options, options.console!)
        } catch (err) {
          return Promise.reject(
            `${
              options.module
            } module was found but a valid ICradleEmitter is not the default export `
          )
        }
      } catch (err) {
        err.message = `Error loading ${options.module}: ${err.message}`
        return Promise.reject(err)
      }
    }
  } else {
    emitter = options.module
  }
  if (emitter.prepareEmitter) {
    await emitter.prepareEmitter()
  }
  return emitter
}
