
import constants from "./constants";
import ConstrainablePropertyType from "./ConstrainablePropertyType";


export default class IntegerPropertyType extends ConstrainablePropertyType {
    constructor(minimumValue?: number, maximumValue?: number, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null) {
        super(constants.Integer, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue)

    }
}