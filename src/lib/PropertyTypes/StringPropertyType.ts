import constants from './constants'
import EnumerablePropertyType, { IEnumerablePropertyTypeOptions } from './EnumerablePropertyType'
import PropertyType from './PropertyType'

export interface IStringPropertyTypeOptions extends IEnumerablePropertyTypeOptions {
  MaximumLength?: number
}

export default class StringPropertyType extends EnumerablePropertyType {
  public MaximumLength?: number

  constructor(options: IStringPropertyTypeOptions = { AllowNull: false, IsPrimaryKey: false, Unique: false }) {
    super(constants.String, options)
    this.MaximumLength = options.MaximumLength
  }

  public equals(other: PropertyType): boolean {
    if (!super.equals(other)) {
      return false
    }
    if (other instanceof StringPropertyType) {
      return other.MaximumLength === this.MaximumLength
    }
    return false
  }
}
