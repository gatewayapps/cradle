import { PropertyTypes } from './constants'
import { IPropertyTypeOptions, PropertyType } from './PropertyType'

export interface IBooleanPropertyTypeOptions extends IPropertyTypeOptions {
  DefaultValue: boolean | number | undefined
}

export class BooleanPropertyType extends PropertyType {
  constructor(options: IBooleanPropertyTypeOptions) {
    super(PropertyTypes.Boolean, options)
  }
}
