import constants from './constants'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'

export interface IArrayPropertyTypeOptions extends IPropertyTypeOptions {
  MemberType: PropertyType | string
}

export default class ArrayPropertyType extends PropertyType {
  public MemberType: PropertyType | string

  constructor(options: IArrayPropertyTypeOptions) {
    super(constants.Array, options)
    this.MemberType = options.MemberType
  }
}
