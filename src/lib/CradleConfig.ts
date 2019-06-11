import { IEmitterOptions } from './EmitterOptions'
import { ILoaderOptions } from './LoaderOptions'

export class CradleConfig {
  public Loader: ILoaderOptions
  public Emitters: any[]

  constructor(loader: ILoaderOptions, emitters: IEmitterOptions[]) {
    this.Loader = loader
    this.Emitters = emitters
  }
}
