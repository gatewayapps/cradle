import ModelReference from './ModelReference'
import PropertyType from './PropertyTypes/PropertyType'

export default class CradleModel {
  public Name: string
  public Meta: object
  public Properties: Map<string, PropertyType >
  public References: Map<string, ModelReference>

  constructor(modelName: string, properties: Map<string, PropertyType>, references: Map<string, ModelReference>, meta: object) {
    this.Name = modelName
    this.Meta = meta
    this.Properties = properties
    this.References = references
  }
}
