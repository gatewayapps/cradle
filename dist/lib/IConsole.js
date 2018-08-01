"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isConsole(object) {
    return ('error' in object &&
        'log' in object &&
        'info' in object &&
        'warn' in object &&
        'debug' in object &&
        'trace' in object);
}
exports.isConsole = isConsole;
//# sourceMappingURL=IConsole.js.map