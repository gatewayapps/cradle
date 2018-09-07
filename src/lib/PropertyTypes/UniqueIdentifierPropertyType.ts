import constants from './constants'
import PropertyType from './PropertyType'

export default class UniqueIdentifierPropertyType extends PropertyType {
  public Autogenerate: boolean
    constructor(allowNull: boolean = false, isPrimaryKey: boolean = false, autogenerate?: any, defaultValue?: any, unique: boolean = false) {
        super(constants.UniqueIdentifier, allowNull, isPrimaryKey, defaultValue, unique)
        this.Autogenerate = autogenerate
    }
}
