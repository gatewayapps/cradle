
import constants from "./constants";
import ConstrainablePropertyType from "./ConstrainablePropertyType";

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
}