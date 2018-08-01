import { IConsole, isConsole } from './IConsole'


export default class LoaderOptions {
    public args: string
    public console: IConsole

    constructor(args: string, console: any) {
        if (!isConsole(console)) {
            throw new Error(`LoaderOptions received a console argument that does not implement IConsole`)
        } else {
            this.args = args
            this.console = console
        }
    }
}