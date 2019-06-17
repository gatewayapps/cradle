import { CradleSchema } from './CradleSchema'
import mappings, { CradleTypeMapping } from '@gatewayapps/cradle-type-mappings'
import { EmitterOptionsArgs } from './EmitterOptions'
import { IConsole } from './IConsole'
import { ICradleEmitter } from './ICradleEmitter'
import {
  PropertyTypes,
  PropertyType,
  StringPropertyType,
  ArrayPropertyType,
  ImportModelType,
  ReferenceModelType
} from './PropertyTypes'
import { CradleConfig } from './CradleConfig'

export abstract class CradleEmitterBase implements ICradleEmitter {
  public options: EmitterOptionsArgs
  public output: string
  public console: IConsole
  protected cradleConfiguration: CradleConfig
  constructor(options: EmitterOptionsArgs, output: string, cradleConfiguration: CradleConfig) {
    this.options = options
    this.output = output
    this.console = console
    this.cradleConfiguration = cradleConfiguration
  }
  public emitSchema(schema: CradleSchema) {
    throw new Error('Method not implemented.')
  }

  private loadTypeMapping(typeMapping: string): CradleTypeMapping {
    const mappingNames = this.cradleConfiguration.typeMappings
      ? Object.keys(this.cradleConfiguration.typeMappings)
      : []
    // mappingNames.forEach()
    // if (mappings[typeMapping]) {
    // }
  }

  public mapType(propertyType: PropertyType, typeMapping: string) {
    switch (propertyType.TypeName) {
      case PropertyTypes.Boolean: {
        return 'boolean'
      }
      case PropertyTypes.Binary: {
        return 'ArrayBuffer'
      }
      case PropertyTypes.DateTime: {
        return 'Date'
      }
      case PropertyTypes.Decimal:
      case PropertyTypes.Integer: {
        return 'number'
      }
      case PropertyTypes.UniqueIdentifier:
      case PropertyTypes.String: {
        const stringProperty = propertyType as StringPropertyType
        if (stringProperty.AllowedValues && stringProperty.AllowedValues.length > 0) {
          return stringProperty.AllowedValues.map((v) => `'${v}'`).join(' | ')
        }

        return 'string'
      }
      case PropertyTypes.Array: {
        const arrayType = propertyType as ArrayPropertyType
        if (typeof arrayType.MemberType === 'string') {
          return `${arrayType.MemberType}[]`
        } else {
          const baseType = this.mapType(arrayType.MemberType, typeMapping)
          return `${baseType}[]`
        }
      }
      case PropertyTypes.ImportModel: {
        const importType = propertyType as ImportModelType
        return `I${importType.ModelName}`
      }
      case PropertyTypes.ReferenceModel: {
        const referenceType = propertyType as ReferenceModelType
        return `I${referenceType.ModelName}`
      }
      default: {
      }
    }
  }
}
