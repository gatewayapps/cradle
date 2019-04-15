import constants from './constants'
import PropertyType from './PropertyType'
import SecurablePropertyType, { ISecurablePropertyTypeOptions } from './SecurablePropertyType'

export interface IBinaryPropertyTypeOptions extends ISecurablePropertyTypeOptions {
  MaximumLength?: number
}

export default class BinaryPropertyType extends SecurablePropertyType {
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
