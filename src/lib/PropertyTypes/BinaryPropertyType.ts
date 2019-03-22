import constants from './constants'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'

export interface IBinaryPropertyTypeOptions extends IPropertyTypeOptions {
  MaximumLength?: number
}

export default class BinaryPropertyType extends PropertyType {
  public MaximumLength?: number

  constructor(options: IBinaryPropertyTypeOptions) {
    super(constants.Binary, options)
    this.MaximumLength = options.MaximumLength
  }

  public equals(other: PropertyType): boolean {
    if (!super.equals(other)) {
      return false
    }
    if (other instanceof BinaryPropertyType) {
      return other.MaximumLength === this.MaximumLength
    }
    return false
  }
}
