import constants from './constants'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'

export interface IObjectPropertyTypeOptions extends IPropertyTypeOptions {
  Members: Map<string, PropertyType>
}

export default class ObjectPropertyType extends PropertyType {
  public Members: { [name: string]: PropertyType } = {}

  constructor(options: IObjectPropertyTypeOptions) {
    super(constants.Object, options)

    const memberNames = Object.keys(options.Members)
    memberNames.forEach((mn) => {
      this.Members[mn] = options.Members[mn]
    })
  }

  public toString(): string {
    const stringParts: string[] = []
    const memberKeys = Object.keys(this.Members)
    memberKeys.map((k) => {
      stringParts.push(`${k}: ${this.Members[k]}`)
    })
    return stringParts.join('\n')
  }
}
