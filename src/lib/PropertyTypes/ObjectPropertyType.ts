import constants from './constants'
import PropertyType from './PropertyType'

export default class ObjectPropertyType extends PropertyType {

    public Members: PropertyType[]

    constructor(members: PropertyType[], allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null) {
        super(constants.Object, allowNull, isPrimaryKey, defaultValue, false)
        this.Members = members
    }
}
