import { isNullOrUndefined } from 'util'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'
import SecurablePropertyType, { ISecurablePropertyTypeOptions } from './SecurablePropertyType'

export interface IConstrainablePropertyTypeOptions extends ISecurablePropertyTypeOptions {
  MinimumValue?: number | Date | undefined
  MaximumValue?: number | Date | undefined
}

export default abstract class ConstrainablePropertyType extends SecurablePropertyType {
  public MinimumValue?: number | Date
  public MaximumValue?: number | Date

  constructor(typeName: string, options: IConstrainablePropertyTypeOptions) {
    if (!isNullOrUndefined(options.MinimumValue) && !isNullOrUndefined(options.MaximumValue)) {
      if (options.MinimumValue > options.MaximumValue) {
        throw new RangeError(`minimumValue can not be greater than maximumValue for type: ${typeName}`)
      }
    }

    super(typeName, options)
    this.MinimumValue = options.MinimumValue
    this.MaximumValue = options.MaximumValue
  }

  public equals(other: PropertyType): boolean {
    if (!super.equals(other)) {
      return false
    }
    if (other instanceof ConstrainablePropertyType) {
      return this.MinimumValue === other.MinimumValue && this.MaximumValue === other.MaximumValue
    }
    return false
  }
}
