import { PropertyType } from './PropertyTypes/PropertyType'

export interface ICradleOperation {
  Returns: PropertyType
  Arguments: Map<string, PropertyType>
}
