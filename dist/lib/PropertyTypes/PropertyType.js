"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyType {
    constructor(typeName, allowNull = false, isPrimaryKey = false, defaultValue = null) {
        this.TypeName = typeName;
        this.IsPrimaryKey = isPrimaryKey;
        this.AllowNull = allowNull;
        this.DefaultValue = defaultValue;
    }
    toString() {
        return this.TypeName;
    }
    equals(other) {
        return (this.toString() === other.toString() &&
            this.IsPrimaryKey === other.IsPrimaryKey &&
            this.AllowNull === other.AllowNull &&
            this.DefaultValue === other.DefaultValue);
    }
}
exports.default = PropertyType;
//# sourceMappingURL=PropertyType.js.map