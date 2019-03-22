import constants from './constants'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'

export interface IUniqueIdentifierPropertyTypeOptions extends IPropertyTypeOptions {
  Autogenerate: boolean
}

export default class UniqueIdentifierPropertyType extends PropertyType {
  public Autogenerate: boolean
  constructor(options: IUniqueIdentifierPropertyTypeOptions = { AllowNull: false, IsPrimaryKey: false, Autogenerate: false, Unique: false }) {
    super(constants.UniqueIdentifier, options)
    this.Autogenerate = options.Autogenerate
  }
}
