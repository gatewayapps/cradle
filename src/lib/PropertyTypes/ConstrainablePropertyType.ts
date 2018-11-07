import { isNullOrUndefined } from 'util'
import PropertyType from './PropertyType'

export default abstract class ConstrainablePropertyType extends PropertyType {
    public MinimumValue?: number
    public MaximumValue?: number

    constructor(typeName: string, minimumValue?: number, maximumValue?: number, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean | string = false) {
        if (!isNullOrUndefined(minimumValue) && !isNullOrUndefined(maximumValue)) {

            if (minimumValue > maximumValue) {
                throw new RangeError(`minimumValue can not be greater than maximumValue for type: ${typeName}`)
            }
        }

        super(typeName, allowNull, isPrimaryKey, defaultValue, unique)
        this.MinimumValue = minimumValue
        this.MaximumValue = maximumValue
    }

    public equals(other: PropertyType): boolean {
        if (!super.equals(other)) {
            return false
        }
        if (other instanceof ConstrainablePropertyType) {
            return this.MinimumValue === other.MinimumValue && this.MaximumValue === other.MaximumValue
        }
        return false
    }
}
