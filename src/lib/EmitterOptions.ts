import { IConsole } from './IConsole'

export interface IEmitterOptions {
  name: string
  module: string
  options: any
  console: IConsole
}
export default class EmitterOptions<T> implements IEmitterOptions {
  public name: string
  public module: string
  public console: IConsole
  public options: T

  constructor(_name: string, _module: string, _options: T, _console: IConsole) {
    this.name = _name
    this.module = _module
    this.options = _options
    this.console = _console
  }
}
