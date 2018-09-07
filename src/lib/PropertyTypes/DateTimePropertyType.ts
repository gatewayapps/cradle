import PropertyType from "./PropertyType";
import constants from "./constants";

export default class DateTimePropertyType extends PropertyType {
    constructor(allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean = false) {
        super(constants.DateTime, allowNull, isPrimaryKey, defaultValue, unique)
    }
    
}