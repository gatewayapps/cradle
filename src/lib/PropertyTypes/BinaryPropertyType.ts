import constants from './constants'
import PropertyType from './PropertyType'

export default class BinaryPropertyType extends PropertyType {
    public MaximumLength?: number

    constructor(maximumLength?: number, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean = false) {
        super(constants.Binary, allowNull, isPrimaryKey, defaultValue, unique)
        this.MaximumLength = maximumLength
    }

    public equals(other: PropertyType): boolean {
        if (!super.equals(other)) {
            return false
        }
        if (other instanceof BinaryPropertyType) {
            return other.MaximumLength === this.MaximumLength
        }
        return false
    }
}
