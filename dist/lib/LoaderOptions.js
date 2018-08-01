"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IConsole_1 = require("./IConsole");
class LoaderOptions {
    constructor(args, console) {
        if (!IConsole_1.isConsole(console)) {
            throw new Error(`LoaderOptions received a console argument that does not implement IConsole`);
        }
        else {
            this.args = args;
            this.console = console;
        }
    }
}
exports.default = LoaderOptions;
//# sourceMappingURL=LoaderOptions.js.map