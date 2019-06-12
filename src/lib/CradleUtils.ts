import { EmitterDefinition } from './EmitterConfiguration'

import { EmitterOptionsArgs } from './EmitterOptions'
import { ICradleEmitter, ICradleEmitterConstructable } from './ICradleEmitter'
import { ICradleLoader, ICradleLoaderConstructable } from './ICradleLoader'
import { ILoaderOptions } from './LoaderOptions'

const handler = {
  construct() {
    return handler
  }
} //Must return ANY object, so reuse one
const isConstructor = (x) => {
  try {
    return !!new new Proxy(x, handler)()
  } catch (e) {
    return false
  }
}

export async function getLoader(options: ILoaderOptions): Promise<ICradleLoader> {
  let loader!: ICradleLoader
  if (typeof options.module === 'string') {
    // TO-DO: handle other loaders here
    try {
      const loaderDefRef: any = require(options.module)
      const loaderDef: ICradleLoaderConstructable = loaderDefRef.default ? loaderDefRef.default : loaderDefRef
      try {
        loader = new loaderDef(options)
      } catch (err) {
        return Promise.reject(`${options.module} module was found but a valid ICradleLoader is not the default export`)
      }
    } catch (err) {
      return Promise.reject(err)
    }
  } else {
    loader = options.module
  }
  if (loader.prepareLoader) {
    await loader.prepareLoader()
  }

  return loader
}

export async function getEmitter(options: EmitterDefinition, baseOptions: EmitterOptionsArgs = {}): Promise<ICradleEmitter> {
  let emitter: ICradleEmitter

  if (!options.module) {
    throw new Error(`Expected an instance of IEmitterOptions, got: { ${Object.keys(options).join(', ')} }`)
  }
  if (typeof options.module === 'string') {
    if (!options.console) {
      throw new Error('You must pass a console argument if you are passing a module name')
    }

    try {
      let EmitterDef: ICradleEmitterConstructable | any = require(options.module)
      if (!isConstructor(EmitterDef)) {
        EmitterDef = EmitterDef.default
      }

      try {
        emitter = new EmitterDef(options.options, options.output, options.console!)
      } catch (err) {
        console.error(err)
        return Promise.reject(`${options.module} module was found but a valid ICradleEmitter is not the default export `)
      }
    } catch (err) {
      console.error(err)
      err.message = `Error loading ${options.module}: ${err.message}`
      return Promise.reject(err)
    }
  } else {
    emitter = options.module
  }
  if (emitter.prepareEmitter) {
    await emitter.prepareEmitter()
  }

  return emitter
}
