
import constants from "./constants";
import ConstrainablePropertyType from "./ConstrainablePropertyType";
import PropertyType from "./PropertyType";

export default class DecimalPropertyType extends ConstrainablePropertyType {

    public Precision: number
    public Scale: number

    constructor(precision: number = 18, scale: number = 2, minimumValue?: number, maximumValue?: number, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null, unique: boolean = false) {
        super(constants.Decimal, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue, unique)
        this.MinimumValue = minimumValue
        this.MaximumValue = maximumValue
        this.Precision = precision
        this.Scale = scale
    }

    public equals(other: PropertyType): boolean {
        if (!super.equals(other)) {
            return false
        }
        if (other instanceof DecimalPropertyType) {
            return this.Precision === other.Precision && this.Scale === other.Scale
        }
        return false
    }
}