import EnumerablePropertyType from "./EnumerablePropertyType";
import PropertyType from "./PropertyType";
export default class StringPropertyType extends EnumerablePropertyType {
    MaximumLength?: number;
    constructor(maximumLength?: number, allowedValues?: any[], caseSensitive?: boolean, allowNull?: boolean, isPrimaryKey?: boolean, defaultValue?: any);
    equals(other: PropertyType): boolean;
}
//# sourceMappingURL=StringPropertyType.d.ts.map