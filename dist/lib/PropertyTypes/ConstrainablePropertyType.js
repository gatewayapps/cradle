"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyType_1 = __importDefault(require("./PropertyType"));
class ConstrainablePropertyType extends PropertyType_1.default {
    constructor(typeName, minimumValue, maximumValue, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        super(typeName, allowNull, isPrimaryKey, defaultValue);
        this.MinimumValue = minimumValue;
        this.MaximumValue = maximumValue;
    }
    equals(other) {
        if (!super.equals(other)) {
            return false;
        }
        if (other instanceof ConstrainablePropertyType) {
            return this.MinimumValue === other.MinimumValue && this.MaximumValue === other.MaximumValue;
        }
        return false;
    }
}
exports.default = ConstrainablePropertyType;
//# sourceMappingURL=ConstrainablePropertyType.js.map