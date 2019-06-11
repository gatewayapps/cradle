import { ConstrainablePropertyType } from '.'
import { PropertyTypes } from './constants'
import { IConstrainablePropertyTypeOptions } from './ConstrainablePropertyType'

export class DateTimePropertyType extends ConstrainablePropertyType {
  constructor(options: IConstrainablePropertyTypeOptions) {
    super(PropertyTypes.DateTime, options)
  }
}
