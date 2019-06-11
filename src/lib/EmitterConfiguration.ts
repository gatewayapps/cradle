import { ICradleEmitter } from '..'
import { EmitterOptionsArgs } from './EmitterOptions'
import { IConsole } from './IConsole'

export interface IEmitterDefinition {
  name: string
  module: string | ICradleEmitter
  options?: EmitterOptionsArgs
}
export class EmitterDefinition implements IEmitterDefinition {
  public name: string
  public module: string | ICradleEmitter
  public console?: IConsole
  public options: EmitterOptionsArgs

  constructor(
    _name: string,
    _module: string | ICradleEmitter,
    _options: EmitterOptionsArgs,
    _console?: IConsole
  ) {
    this.name = _name
    this.module = _module
    this.options = _options
    this.console = _console
  }
}
