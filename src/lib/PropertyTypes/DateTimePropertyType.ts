import constants from './constants'
import ConstrainablePropertyType, {
  IConstrainablePropertyTypeOptions
} from './ConstrainablePropertyType'

export default class DateTimePropertyType extends ConstrainablePropertyType {
  constructor(options: IConstrainablePropertyTypeOptions) {
    super(constants.DateTime, options)
  }
}
