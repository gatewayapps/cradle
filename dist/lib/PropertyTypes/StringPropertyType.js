"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnumerablePropertyType_1 = __importDefault(require("./EnumerablePropertyType"));
const constants_1 = __importDefault(require("./constants"));
class StringPropertyType extends EnumerablePropertyType_1.default {
    constructor(maximumLength, allowedValues, caseSensitive = false, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        super(constants_1.default.String, allowedValues, allowNull, isPrimaryKey, defaultValue);
        this.MaximumLength = maximumLength;
    }
    equals(other) {
        if (!super.equals(other)) {
            return false;
        }
        if (other instanceof StringPropertyType) {
            return other.MaximumLength === this.MaximumLength;
        }
        return false;
    }
}
exports.default = StringPropertyType;
//# sourceMappingURL=StringPropertyType.js.map