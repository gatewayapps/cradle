import EnumerablePropertyType from "./EnumerablePropertyType";
import constants from "./constants";
import PropertyType from "./PropertyType";

export default class StringPropertyType extends EnumerablePropertyType {
    public MaximumLength?: number

    constructor(maximumLength?: number, allowedValues?: any[], caseSensitive: boolean = false, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null, unique: boolean = false) {
        super(constants.String, allowedValues, allowNull, isPrimaryKey, defaultValue, unique)
        this.MaximumLength = maximumLength
    }

    public equals(other: PropertyType): boolean {
        if (!super.equals(other)) {
            return false
        }
        if (other instanceof StringPropertyType) {
            return other.MaximumLength === this.MaximumLength
        }
        return false
    }


}