"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const ConstrainablePropertyType_1 = __importDefault(require("./ConstrainablePropertyType"));
class IntegerPropertyType extends ConstrainablePropertyType_1.default {
    constructor(minimumValue, maximumValue, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        super(constants_1.default.Integer, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue);
    }
}
exports.default = IntegerPropertyType;
//# sourceMappingURL=IntegerPropertyType.js.map