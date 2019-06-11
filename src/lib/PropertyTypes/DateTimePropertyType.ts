import { PropertyTypes } from './constants'
import {
  ConstrainablePropertyType,
  IConstrainablePropertyTypeOptions
} from './ConstrainablePropertyType'

export class DateTimePropertyType extends ConstrainablePropertyType {
  constructor(options: IConstrainablePropertyTypeOptions) {
    super(PropertyTypes.DateTime, options)
  }
}
