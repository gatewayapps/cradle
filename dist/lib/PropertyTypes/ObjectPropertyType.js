"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyType_1 = __importDefault(require("./PropertyType"));
const constants_1 = __importDefault(require("./constants"));
class ObjectPropertyType extends PropertyType_1.default {
    constructor(members, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        super(constants_1.default.Object, allowNull, isPrimaryKey, defaultValue);
        this.Members = members;
    }
}
exports.default = ObjectPropertyType;
//# sourceMappingURL=ObjectPropertyType.js.map