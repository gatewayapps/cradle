import constants from './constants'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'
import SecurablePropertyType, { ISecurablePropertyTypeOptions } from './SecurablePropertyType'

export interface IUniqueIdentifierPropertyTypeOptions extends ISecurablePropertyTypeOptions {
  Autogenerate?: boolean
}

export default class UniqueIdentifierPropertyType extends SecurablePropertyType {
  public Autogenerate: boolean
  constructor(options: IUniqueIdentifierPropertyTypeOptions = { AllowNull: false, IsPrimaryKey: false, Autogenerate: false, Unique: false }) {
    super(constants.UniqueIdentifier, options)
    this.Autogenerate = options.Autogenerate || false
  }
}
