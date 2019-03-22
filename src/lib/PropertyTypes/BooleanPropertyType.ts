import constants from './constants'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'

export interface IBooleanPropertyTypeOptions extends IPropertyTypeOptions {
  DefaultValue: boolean | number | undefined
}

export default class BooleanPropertyType extends PropertyType {
  constructor(options: IBooleanPropertyTypeOptions) {
    super(constants.Boolean, options)
  }
}
