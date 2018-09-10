import constants from './constants'
import PropertyType from './PropertyType'

export default class DateTimePropertyType extends PropertyType {

    public MaxValue: any
    public MinValue: any

    constructor(allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, maxValue?: any, minValue?: any, unique: boolean = false) {
        super(constants.DateTime, allowNull, isPrimaryKey, defaultValue, unique)
        this.MaxValue = maxValue
        this.MinValue = minValue
    }

}
