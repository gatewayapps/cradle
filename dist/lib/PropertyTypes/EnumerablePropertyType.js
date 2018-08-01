"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyType_1 = __importDefault(require("./PropertyType"));
class EnumerablePropertyType extends PropertyType_1.default {
    constructor(typeName, allowedValues, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        super(typeName, allowNull, isPrimaryKey, defaultValue);
        this.AllowedValues = allowedValues;
    }
    equals(other) {
        if (!super.equals(other)) {
            return false;
        }
        if (other instanceof EnumerablePropertyType) {
            return this.arrayEquals(this.AllowedValues, other.AllowedValues);
        }
        return false;
    }
    /**
     *  Source code for array equals from here: https://stackoverflow.com/a/16436975
     * @param a first array
     * @param b second array
     */
    arrayEquals(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
}
exports.default = EnumerablePropertyType;
//# sourceMappingURL=EnumerablePropertyType.js.map