import { ICradleOperation } from './ICradleOperation'

import { PropertyType } from './PropertyTypes/PropertyType'

export class CradleModel {
  public Name: string
  public Meta: object
  public Properties: Map<string, PropertyType>

  public Operations: Map<string, ICradleOperation>

  constructor(
    modelName: string,
    properties: Map<string, PropertyType>,
    meta: object,
    operations: Map<string, ICradleOperation>
  ) {
    this.Name = modelName
    this.Meta = meta
    this.Properties = properties

    this.Operations = operations
  }
}
