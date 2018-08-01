import PropertyType from "./PropertyType";
import constants from "./constants";

export default class DateTimePropertyType extends PropertyType {
    constructor(allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null) {
        super(constants.DateTime, allowNull, isPrimaryKey, defaultValue)
    }
}