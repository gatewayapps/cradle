import { EmitterDefinition } from './EmitterConfiguration'
import { ILoaderOptions } from './LoaderOptions'
import { EmitterOptionsArgs } from './EmitterOptions'
import { CradleTypeMapping } from '@gatewayapps/cradle-type-mappings'

export type ICradleConfig = {
  loader: ILoaderOptions
  emitters: { [key: string]: EmitterDefinition }
  defaultOptions?: EmitterOptionsArgs
  typeMappings?: { [key: string]: CradleTypeMapping }
}

export class CradleConfig {
  public Loader: ILoaderOptions
  public Emitters: { [key: string]: EmitterDefinition }
  public defaultOptions?: EmitterOptionsArgs
  public typeMappings?: { [key: string]: CradleTypeMapping }

  constructor(
    loader: ILoaderOptions,
    emitters: { [key: string]: EmitterDefinition },
    defaultOptions: EmitterOptionsArgs = {},
    typeMappings: { [key: string]: CradleTypeMapping } = {}
  ) {
    this.Loader = loader
    this.Emitters = emitters
    this.defaultOptions = defaultOptions
    this.typeMappings = typeMappings
  }
}
