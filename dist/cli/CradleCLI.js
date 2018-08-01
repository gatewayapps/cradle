#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const packageInfo = require('../../package.json');
commander_1.default
    .version(packageInfo.version);
class CradleCLI {
    static log(message) {
        console.log(message);
    }
}
exports.CradleCLI = CradleCLI;
CradleCLI.log('testing');
//# sourceMappingURL=CradleCLI.js.map