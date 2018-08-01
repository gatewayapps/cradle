import PropertyType from "./PropertyType";
export default abstract class EnumerablePropertyType extends PropertyType {
    AllowedValues?: any[];
    constructor(typeName: string, allowedValues?: any[], allowNull?: boolean, isPrimaryKey?: boolean, defaultValue?: any);
    equals(other: PropertyType): boolean;
    /**
     *  Source code for array equals from here: https://stackoverflow.com/a/16436975
     * @param a first array
     * @param b second array
     */
    private arrayEquals;
}
//# sourceMappingURL=EnumerablePropertyType.d.ts.map