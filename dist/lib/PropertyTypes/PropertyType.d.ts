import IPropertyType from "./IPropertyType";
export default abstract class PropertyType implements IPropertyType {
    TypeName: string;
    IsPrimaryKey: boolean;
    AllowNull: boolean;
    DefaultValue: any;
    constructor(typeName: string, allowNull?: boolean, isPrimaryKey?: boolean, defaultValue?: any);
    toString(): string;
    equals(other: PropertyType): boolean;
}
//# sourceMappingURL=PropertyType.d.ts.map