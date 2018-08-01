import PropertyType from "./PropertyType";
import constants from "./constants";

export default class ObjectPropertyType extends PropertyType {

    public Members: PropertyType[]

    constructor(members: PropertyType[], allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null) {
        super(constants.Object, allowNull, isPrimaryKey, defaultValue)
        this.Members = members
    }
}