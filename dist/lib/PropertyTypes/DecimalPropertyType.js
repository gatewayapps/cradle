"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const ConstrainablePropertyType_1 = __importDefault(require("./ConstrainablePropertyType"));
class DecimalPropertyType extends ConstrainablePropertyType_1.default {
    constructor(precision = 18, scale = 2, minimumValue, maximumValue, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        super(constants_1.default.Decimal, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue);
        this.MinimumValue = minimumValue;
        this.MaximumValue = maximumValue;
        this.Precision = precision;
        this.Scale = scale;
    }
}
exports.default = DecimalPropertyType;
//# sourceMappingURL=DecimalPropertyType.js.map