import { IConsole, isConsole } from './IConsole'
import InvalidConsoleError from '../Errors/InvalidConsoleError'

export default class LoaderOptions {
    public args: string
    public console: IConsole

    constructor(args: string, console: any) {
        if (!isConsole(console)) {
            throw new InvalidConsoleError(console)
        } else {
            this.args = args
            this.console = console
        }
    }
}