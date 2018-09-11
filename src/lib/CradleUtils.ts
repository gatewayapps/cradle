import EmitterOptions, { IEmitterOptions } from './EmitterOptions'
import ICradleEmitter from './ICradleEmitter'
import ICradleLoader from './ICradleLoader'
import LoaderOptions from './LoaderOptions'
import SpecEmitter from './SpecEmitter/SpecEmitter'
import SpecLoader from './SpecLoader/SpecLoader'

export async function getLoader(options: LoaderOptions): Promise < ICradleLoader > {
  let loader!: ICradleLoader
  if (options.module.toLowerCase() === 'spec') {
  // use cradle spec loader
    loader = new SpecLoader()

} else        {
  // TO-DO: handle other loaders here
    try {
      const loaderDef = require(options.module)
      try {
      loader = new loaderDef()
      } catch (err) {
        return Promise.reject(`${options.module} module was found but a valid ICradleLoader is not the default export`)
      }
    } catch (err) {
      return Promise.reject(err)
    }
}
  await loader.prepareLoader(options.options, options.console)
  return Promise.resolve(loader)
}

export async function getEmitter(options: IEmitterOptions): Promise<ICradleEmitter> {
  let emitter: ICradleEmitter
  if (options.module === 'spec') {
    emitter = new SpecEmitter()
  } else {
    try {
    const emitterDef = require(options.module)
    try {
      emitter = new emitterDef()
    } catch (err) {
      return Promise.reject(`${options.module} module was found but a valid ICradleEmitter is not the default export`)
      }
  } catch (err) {
    return Promise.reject(err)
  }
  }
  await emitter.prepareEmitter(options, options.console )
  return Promise.resolve(emitter)
}
