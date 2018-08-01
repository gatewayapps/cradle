import ConstrainablePropertyType from "./ConstrainablePropertyType";
export default class DecimalPropertyType extends ConstrainablePropertyType {
    Precision: number;
    Scale: number;
    constructor(precision?: number, scale?: number, minimumValue?: number, maximumValue?: number, allowNull?: boolean, isPrimaryKey?: boolean, defaultValue?: any);
}
//# sourceMappingURL=DecimalPropertyType.d.ts.map