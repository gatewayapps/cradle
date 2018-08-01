import PropertyType from "./PropertyType"
import constants from "./constants";

export default class BooleanPropertyType extends PropertyType {
    constructor(allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: boolean = false) {
        super(constants.Boolean, allowNull, isPrimaryKey, defaultValue)
    }
}