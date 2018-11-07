import constants from './constants'
import PropertyType from './PropertyType'

export default class BooleanPropertyType extends PropertyType {
    constructor(allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: boolean | number, unique: boolean | string = false) {
        super(constants.Boolean, allowNull, isPrimaryKey, defaultValue === undefined ? undefined : !!defaultValue, unique)
    }
}
