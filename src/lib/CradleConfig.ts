import { IEmitterOptions } from './EmitterOptions'
import { LoaderOptions } from './LoaderOptions'

export class CradleConfig {
  public Loader: LoaderOptions
  public Emitters: any[]

  constructor(loader: LoaderOptions, emitters: IEmitterOptions[]) {
    this.Loader = loader
    this.Emitters = emitters
  }
}
