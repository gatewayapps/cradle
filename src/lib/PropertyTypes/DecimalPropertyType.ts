import constants from './constants'
import ConstrainablePropertyType, {
  IConstrainablePropertyTypeOptions
} from './ConstrainablePropertyType'
import PropertyType from './PropertyType'

export interface IDecimalPropertyTypeOptions extends IConstrainablePropertyTypeOptions {
  Precision?: number
  Scale?: number
}

export default class DecimalPropertyType extends ConstrainablePropertyType {
  public Precision?: number
  public Scale?: number

  constructor(options: IDecimalPropertyTypeOptions) {
    super(constants.Decimal, options)

    this.Precision = options.Precision
    this.Scale = options.Scale
  }

  public equals(other: PropertyType): boolean {
    if (!super.equals(other)) {
      return false
    }
    if (other instanceof DecimalPropertyType) {
      return this.Precision === other.Precision && this.Scale === other.Scale
    }
    return false
  }
}
