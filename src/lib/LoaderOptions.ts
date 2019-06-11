import { InvalidConsoleError } from './Errors/InvalidConsoleError'
import { IConsole, isConsole } from './IConsole'

export class LoaderOptions {
  public module: string
  public options: { [key: string]: any }
  public console: IConsole

  constructor(_module: string, _options: { [key: string]: any }, _console: any) {
    if (!isConsole(_console)) {
      throw new InvalidConsoleError(_console)
    } else {
      this.module = _module
      this.options = _options
      this.console = _console
    }
  }
}
