import { appendFileSync, existsSync, openSync, writeFileSync } from 'fs'
import {dump, safeDump} from 'js-yaml'
import CradleModel from '../CradleModel'
import CradleSchema from '../CradleSchema'
import EmitterOptions from '../EmitterOptions'
import {IConsole} from '../IConsole'
import ICradleEmitter from '../ICradleEmitter'
import ArrayPropertyType from '../PropertyTypes/ArrayPropertyType'
import constants from '../PropertyTypes/constants'
import DateTimePropertyType from '../PropertyTypes/DateTimePropertyType'
import DecimalPropertyType from '../PropertyTypes/DecimalPropertyType'
import IntegerPropertyType from '../PropertyTypes/IntegerPropertyType'
import ObjectPropertyType from '../PropertyTypes/ObjectPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'
import StringPropertyType from '../PropertyTypes/StringPropertyType'
import UniqueIdentifierPropertyType from '../PropertyTypes/UniqueIdentifierPropertyType'
import ISpecEmitterOptions from './SpecEmitterOptions'

export default class SpecEmitter implements ICradleEmitter {
  public config?: EmitterOptions<ISpecEmitterOptions>
  public console?: IConsole
  public prepareEmitter(options: EmitterOptions<ISpecEmitterOptions>, console: IConsole) {
    this.config = options
    this.console = console
  }

  public emitSchema(schema: CradleSchema) {
    const models = {}
    schema.Models.map((m) => {

      models[m.Name] = this.generateModelSpec(m)
    })

    if (this.tryCreateFile(this.config!.options.outputPath.toString())) {
        writeFileSync(this.config!.options.outputPath.toString(), safeDump(models), 'utf8' )

    }
  }

  private generateModelSpec(model: CradleModel | ObjectPropertyType): {meta: object | undefined, properties: object, references: object} {
    const propertiesCollection = (model instanceof CradleModel) ? model.Properties : model.Members
    const propertyNames = Object.keys(propertiesCollection)
    const retVal = {
      meta: (model instanceof CradleModel) ? model.Meta : undefined,
      properties: {},
      references: {}
    }
    if (retVal.meta === undefined) {
      delete retVal.meta
    }

    propertyNames.map((pn) => {

      if (propertiesCollection[pn].TypeName === constants.Object) {
        retVal.properties[pn] = {
          isArray : false,
          properties: this.generateModelSpec((propertiesCollection[pn])).properties
        }
      } else if (propertiesCollection[pn].TypeName === constants.Array && propertiesCollection[pn].MemberType && propertiesCollection[pn].MemberType.TypeName === constants.Object ) {
          retVal.properties[pn] = {
          isArray: propertiesCollection[pn].TypeName === constants.Array ? true : false,
          properties: this.generateModelSpec((propertiesCollection[pn].MemberType)).properties
          }
      } else {
      retVal.properties[pn] = this.generatePropertySpec(propertiesCollection[pn])
      }
    })

    return retVal

  }

  private getPropertyTypeName(prop: PropertyType) {
    const parts: string[] = []
    if (prop.TypeName === constants.Array) {
      parts.push(((prop as ArrayPropertyType).MemberType as PropertyType).TypeName.toLowerCase())
      parts.push('[]')
    } else {
      parts.push(prop.TypeName.toLowerCase())
    }
    if (prop.AllowNull) {
      parts.push('?')
    }
    return parts.join('').toLowerCase()
  }

  private generatePropertySpec(prop: PropertyType) {
    const parts: string[] = []

    const propertyName = this.getPropertyTypeName(prop)
    const defaultValue = this.coerceValueType(prop.DefaultValue, propertyName)
    const primary = prop.IsPrimaryKey ? 'primary' : ''
    const uniqueValue = prop.Unique ? 'unique' : ''

    parts.push(propertyName)
    if (primary !== '') {
      parts.push(primary)
    }

    if (uniqueValue !== '') {
      parts.push(uniqueValue)
    }

    if (defaultValue) {
      parts.push(`default(${defaultValue})`)
    }

    switch (prop.TypeName) {
      case constants.Integer: {
        const int = (prop as IntegerPropertyType)
        if (int.MinimumValue !== undefined) {
          const min = this.coerceValueType(int.MinimumValue, propertyName)
          parts.push(`min(${min})`)
        }
        if (int.MaximumValue !== undefined) {
          const max = this.coerceValueType(int.MaximumValue, propertyName)
          parts.push(`max(${max})`)
        }
        if (int.Autogenerate) {
          const seed = int.Autogenerate.Seed
          const interval = int.Autogenerate.Increment
          parts.push(`auto(${seed}, ${interval})`)
        }
        break
      }
      case constants.Decimal: {
        const int = (prop as DecimalPropertyType)
        if (int.MinimumValue !== undefined) {
          const min = this.coerceValueType(int.MinimumValue, propertyName)
          parts.push(`min(${min})`)
        }
        if (int.MaximumValue !== undefined) {
          const max = this.coerceValueType(int.MaximumValue, propertyName)
          parts.push(`max(${max})`)
        }
        break
      }
      case constants.DateTime: {
        const int = (prop as DateTimePropertyType)
        if (int.MinValue) {
          const min = this.coerceValueType(int.MinValue, propertyName)
          parts.push(`min(${min})`)
        }
        if (int.MaxValue !== undefined) {
          const max = this.coerceValueType(int.MaxValue, propertyName)
          parts.push(`max(${max})`)
        }
        break
      }
      case constants.String: {
        const str = (prop as StringPropertyType)
        if (str.AllowedValues != null && str.AllowedValues.length > 0) {
          const allowedValues = str.AllowedValues.map((av) => this.coerceValueType(av, propertyName))
          parts.push(`allow(${allowedValues.join(', ')})`)
        }
      }
      case constants.UniqueIdentifier: {
        const uuid = (prop as UniqueIdentifierPropertyType)
        if (uuid.Autogenerate) {
          parts.push('auto')
        }
      }

    }
    return parts.join(' ')

  }

  private coerceValueType(value: any, propertyType: string): string | undefined {
    if (!value || value === '' || value === undefined || value === null || propertyType === 'object' || propertyType === 'object[]' || propertyType === 'object[]?') {
      return undefined
    }
    const basePropertyType = propertyType.replace(/(\[\]|\?)/ig, '').toLowerCase()
    switch (basePropertyType) {
      case constants.Boolean.toLowerCase(): return !!value ? 'true' : 'false'
      case constants.DateTime.toLowerCase(): return value instanceof Date ? value.toISOString() : 'NOW'
      case constants.Decimal.toLowerCase(): return value.toString()
      case constants.Integer.toLowerCase(): return value.toString()
      case constants.String.toLowerCase(): return `${value.toString()}`
      case constants.UniqueIdentifier.toLowerCase() : return value.toString()
      default: throw new Error(`Invalid data type for values: ${typeof value} cannot be converted to (${propertyType})`)
    }

  }

  private tryCreateFile(fileName: string): boolean | number {
    if (this.config!.options.overwriteExisting && existsSync(fileName)) {
      return false
    } else {
      return openSync(fileName, 'w')

    }
  }

  }
