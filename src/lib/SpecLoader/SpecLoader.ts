import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { CradleLoaderBase } from '../CradleLoaderBase'
import CradleSchema from '../CradleSchema'
import { IConsole } from '../IConsole'
import { ICradleOperation } from '../ICradleOperation'

import { CradleModel } from '../..'
import ArrayPropertyType from '../PropertyTypes/ArrayPropertyType'
import BinaryPropertyType from '../PropertyTypes/BinaryPropertyType'
import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import constants from '../PropertyTypes/constants'
import DateTimePropertyType from '../PropertyTypes/DateTimePropertyType'
import DecimalPropertyType from '../PropertyTypes/DecimalPropertyType'
import ImportModelType from '../PropertyTypes/ImportModelType'
import IntegerPropertyType from '../PropertyTypes/IntegerPropertyType'
import ObjectPropertyType from '../PropertyTypes/ObjectPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'
import ReferenceModelType from '../PropertyTypes/ReferenceModelType'
import StringPropertyType from '../PropertyTypes/StringPropertyType'
import UniqueIdentifierPropertyType from '../PropertyTypes/UniqueIdentifierPropertyType'
import SpecProperty from './SpecProperty'
import ParseProperty from './SpecPropertyTypeParser'

export default class SpecLoader extends CradleLoaderBase {
  private specObject?: object

  public readModelOperationNames(modelName: string): Promise<string[]> {
    if (!this.specObject) {
      throw new Error(`No spec file loaded`)
    }
    if (!this.specObject[modelName]) {
      throw new Error(`The spec file does not contain a model named '${modelName}'`)
    }
    if (typeof this.specObject[modelName] === typeof '') {
      throw new Error(`The model definition must be an object`)
    } else {
      if (!this.specObject[modelName].operations) {
        return Promise.resolve([])
      } else {
        return Promise.resolve(Object.keys(this.specObject[modelName].operations))
      }
    }
  }

  public async readModelOperation(modelName: string, operationName: string): Promise<ICradleOperation> {
    let returnType = this.specObject![modelName].operations[operationName].returns
    if (returnType) {
      returnType = await this.getPropertyTypeFromDefinition(returnType)
    }
    const _args: any = {}
    const argNames = Object.keys(this.specObject![modelName].operations[operationName].arguments)
    await Promise.all(
      argNames.map(async (argName) => {
        const argValue = this.specObject![modelName].operations[operationName].arguments[argName]
        if (argValue !== null && argValue !== '?') {
          _args[argName] = await this.getPropertyTypeFromDefinition(this.specObject![modelName].operations[operationName].arguments[argName])
        } else {
          try {
            _args[argName] = await this.readModelPropertyType(modelName, argName)
            if (argValue === '?') {
              _args[argName].AllowNull = true
            }
          } catch (err) {
            err.message = `Error encountered when parsing ${modelName}.operations.arguments.${argName}.

          ${err.message}`
            throw err
          }
        }
      })
    )

    return {
      Arguments: _args,
      Returns: returnType
    }
  }
  public async readModelPropertyType(modelName: string, propertyName: string): Promise<PropertyType> {
    return await this.readPropertyDefinition(modelName, [propertyName]).catch((err) => {
      throw new Error(`Error: '${err.message}' encountered while parsing ${modelName}.${propertyName}`)
    })
  }

  public readModelNames(): Promise<string[]> {
    if (this.specObject) {
      const modelNames = Object.keys(this.specObject)
      return Promise.resolve(modelNames)
    } else {
      throw new Error('No spec file loaded')
    }
  }

  public readModelPropertyNames(modelName: string): Promise<string[]> {
    if (!this.specObject) {
      throw new Error(`No spec file loaded`)
    }
    if (!this.specObject[modelName]) {
      throw new Error(`The spec file does not contain a model named '${modelName}'`)
    }
    if (typeof this.specObject[modelName] === typeof '') {
      throw new Error(`The model definition must be an object`)
    } else {
      if (!this.specObject[modelName].properties) {
        throw new Error(`Model '${modelName}' does not define any properties`)
      } else {
        return Promise.resolve(Object.keys(this.specObject[modelName].properties))
      }
    }
  }

  public async prepareLoader(): Promise<void> {
    if (!fs.existsSync(this.options.source)) {
      throw new Error(`Source file does not exist: ${this.options.source}`)
    } else {
      const dir = path.dirname(path.resolve(this.options.source))
      this.specObject = yaml.safeLoad(fs.readFileSync(this.options.source, 'utf8'))

      // Handle split spec files
      // This will only allow spec file references from the master file
      // meaning you can't chain together references.  This also helps prevent
      // circular references
      const modelNames = await this.readModelNames()
      modelNames.map((mn) => {
        if (this.specObject && typeof this.specObject[mn] === typeof '') {
          const fileParts = this.specObject[mn].split('#')
          const filePath = path.join(dir, fileParts[0])
          const modelName = fileParts[1]

          const tempReq = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
          this.specObject[mn] = tempReq[modelName]
        }
      })
    }
  }

  public readModelMetadata(modelName: string): Promise<object> {
    return new Promise((resolve, reject) => {
      return resolve(this.specObject![modelName].meta)
    })
  }

  public finalizeSchema(schema: CradleSchema): Promise<CradleSchema> {
    schema.Models.forEach((model, k) => {
      const propertyNames = Object.keys(model.Properties)
      propertyNames.map((pn) => {
        const prop: PropertyType = model.Properties[pn]

        if (prop.TypeName === constants.ImportModel) {
          const importProp = prop as ImportModelType
          schema.Models[k].Properties[pn].ModelType = schema.GetModel(importProp.ModelName)
        }
        if (prop.TypeName === constants.ReferenceModel) {
          const refProp = prop as ReferenceModelType
          const targetModel: CradleModel | undefined = schema.GetModel(refProp.ModelName)

          if (!targetModel) {
            throw new Error(`Invalid reference ${pn} on ${model.Name}.  Foreign model ${refProp.ModelName} does not exist`)
          }
          if (!targetModel.Properties[refProp.ForeignProperty]) {
            throw new Error(`Invalid reference ${pn} on ${model.Name}. Foreign model ${refProp.ModelName} does not contain a property named ${refProp.ForeignProperty}`)
          }
          if (!model.Properties[refProp.LocalProperty]) {
            throw new Error(`Invalid reference ${pn} on ${model.Name}. ${model.Name} does not contain a property named ${refProp.ForeignProperty}`)
          }

          schema.Models[k].Properties[pn].ModelType = targetModel
        }
      })

      const operationNames = Object.keys(model.Operations)
      operationNames.map((opName) => {
        const op = model.Operations[opName]
        if (op.Returns.TypeName === constants.ImportModel && op.Returns.ModelName) {
          schema.Models[k].Operations[opName].Returns.ModelType = this.getModelReference(schema, op.Returns)
        }
        if (op.Returns.TypeName === constants.Array && op.Returns.MemberType && op.Returns.MemberType.TypeName === constants.ImportModel && op.Returns.MemberType.ModelName) {
          schema.Models[k].Operations[opName].Returns.ModelType = this.getModelReference(schema, op.Returns.MemberType)
        }
      })
    })
    return Promise.resolve(schema)
  }
  public getModelReference(schema: CradleSchema, ref: ImportModelType): ObjectPropertyType {
    const modelRef = schema.GetModel(ref.ModelName)
    if (modelRef) {
      return new ObjectPropertyType(this.propertiesToArray(modelRef.Properties), ref.AllowNull, ref.IsPrimaryKey, ref.DefaultValue)
    } else {
      throw new Error(`Invalid model reference: ${ref.ModelName}`)
    }
  }

  private propertiesToArray(propertyObject: object): Array<{ propertyName: string; propertyType: PropertyType }> {
    const propNames = Object.keys(propertyObject)
    return propNames.map((pn) => ({ propertyName: pn, propertyType: propertyObject[pn] }))
  }

  private async getPropertyTypeFromDefinition(property: any): Promise<PropertyType> {
    if (typeof property === 'string') {
      let specProperty
      try {
        specProperty = ParseProperty(property)
      } catch (err) {
        const modelNames = await this.readModelNames()
        if (modelNames.find((x) => x === property)) {
          return new ImportModelType(property, false)
        } else {
          throw err
        }
      }
      if (specProperty) {
        const propertyType = this.createPropertyTypeFromSpecResult(specProperty)
        if (specProperty.IsArray) {
          return new ArrayPropertyType(propertyType)
        } else {
          return propertyType
        }
      } else {
        throw new Error(`Unable to parse property ${property}`)
      }
    } else {
      const isArray = property.isArray
      if (property.modelRef) {
        if (isArray) {
          return new ArrayPropertyType(new ImportModelType(property.modelRef, false))
        } else {
          return new ImportModelType(property.modelRef, false)
        }
      }
      const subProperties = Object.keys(property.properties)

      const members: Array<{ propertyName: string; propertyType: PropertyType }> = []
      for (const subProp of subProperties) {
        if (!!subProp) {
          members.push({ propertyName: subProp, propertyType: await this.getPropertyTypeFromDefinition(property.properties[subProp]) })
        }
      }
      const propertyType = new ObjectPropertyType(members, true, false, null)
      if (isArray) {
        return new ArrayPropertyType(propertyType)
      } else {
        return propertyType
      }
    }
  }

  private async readPropertyDefinition(modelName: string, propertyPath: string[]): Promise<PropertyType> {
    if (this.specObject) {
      const model = this.specObject[modelName]

      let currentProperty = model.properties[propertyPath[0]]
      for (let i = 1; i < propertyPath.length; i++) {
        if (currentProperty.properties && currentProperty.properties[propertyPath[i]]) {
          currentProperty = currentProperty.properties[propertyPath[i]]
          break
        }
      }

      return await this.getPropertyTypeFromDefinition(currentProperty)
    } else {
      throw new Error(`No spec file loaded`)
    }
  }

  private createPropertyTypeFromSpecResult(spec: SpecProperty): PropertyType {
    switch (spec.PropertyType.toLocaleUpperCase()) {
      case constants.Boolean.toLocaleUpperCase():
        return new BooleanPropertyType(spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.DateTime.toLocaleUpperCase():
        return new DateTimePropertyType(spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.MaxValue, spec.MinValue, spec.Unique)
      case constants.Decimal.toLocaleUpperCase():
        return new DecimalPropertyType(undefined, undefined, spec.MinValue, spec.MaxValue, spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.Integer.toLocaleUpperCase():
        return new IntegerPropertyType(spec.MinValue, spec.MaxValue, spec.AutogenerateOptions, spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.String.toLocaleUpperCase():
        return new StringPropertyType(spec.Length, spec.AllowedValues, true, spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.UniqueIdentifier.toLocaleUpperCase():
        return new UniqueIdentifierPropertyType(spec.Nullable, spec.PrimaryKey, spec.AutogenerateOptions, spec.DefaultValue, spec.Unique)
      case constants.Binary.toLocaleUpperCase():
        return new BinaryPropertyType(spec.Length, spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.ReferenceModel.toLocaleUpperCase():
        return new ReferenceModelType(spec.ModelName!, spec.LocalProperty!, spec.ForeignProperty)
      case constants.ImportModel.toLocaleUpperCase():
        return new ImportModelType(spec.ModelName!, spec.Nullable)
      default: {
        throw new Error(`Unexpected property type: ${spec.PropertyType}`)
      }
    }
  }
}
