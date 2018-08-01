import PropertyType from "./PropertyType";
export default abstract class ConstrainablePropertyType extends PropertyType {
    MinimumValue?: number;
    MaximumValue?: number;
    constructor(typeName: string, minimumValue?: number, maximumValue?: number, allowNull?: boolean, isPrimaryKey?: boolean, defaultValue?: any);
    equals(other: PropertyType): boolean;
}
//# sourceMappingURL=ConstrainablePropertyType.d.ts.map