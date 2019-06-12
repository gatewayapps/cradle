import { CradleModel } from './CradleModel'
import { CradleSchema } from './CradleSchema'
import { EmitterOptionsArgs } from './EmitterOptions'
import { IConsole } from './IConsole'
import { ICradleEmitter } from './ICradleEmitter'
import { ICradleOperation } from './ICradleOperation'
import { ArrayPropertyType, ImportModelType, PropertyType, PropertyTypes, ReferenceModelType } from './PropertyTypes'

export abstract class CradleEmitterBase implements ICradleEmitter {
  public options: EmitterOptionsArgs
  public output: string
  public console: IConsole
  constructor(options: EmitterOptionsArgs, output: string, _console: IConsole) {
    this.options = options
    this.output = output
    this.console = _console || console
  }
  public emitSchema(schema: CradleSchema) {
    throw new Error('Method not implemented.')
  }

  public applyExclusionsToSchema(schema: CradleSchema): CradleSchema {
    let newSchema: CradleSchema = Object.assign(Object.create(Object.getPrototypeOf(schema)), schema)
    const excludes = this.options.exclude || []
    excludes.forEach((exclude) => {
      const excludeParts = exclude.split('.')
      const modelName = excludeParts[0]
      const model = newSchema.GetModel(modelName)
      if (model) {
        const modelIndex = newSchema.GetModelIndex(modelName)
        switch (excludeParts.length) {
          case 1: {
            // Remove all references to this model
            newSchema = this.removeModelReferencesFromSchema(newSchema, model)
          }
          case 2: {
            // Remove all properties or operations
            const refType = excludeParts[1]
            if (refType === 'Operations') {
              const opNames = Object.keys(model.Operations)
              opNames.forEach((opName) => {
                newSchema = this.removeOperationFromSchema(newSchema, model, opName)
              })
            }
            if (refType === 'Properties') {
              const propNames = Object.keys(model.Properties)
              propNames.forEach((propName) => {
                newSchema = this.removePropertyReferencesFromSchema(newSchema, model, propName)
              })
            }
          }
          case 3: {
            // Remove a property or operation
            const refType = excludeParts[1]
            if (refType === 'Operations') {
              const opName = excludeParts[2]
              newSchema = this.removeOperationFromSchema(newSchema, model, opName)
            }
            if (refType === 'Properties') {
              const propName = excludeParts[2]
              newSchema = this.removePropertyReferencesFromSchema(newSchema, model, propName)
            }
          }
        }
      }
    })
    return newSchema
  }

  private removeModelReferencesFromSchema(schema: CradleSchema, model: CradleModel) {
    let modelIndex = -1

    schema.Models.forEach((modelRef, index) => {
      if (modelRef.Name === model.Name) {
        modelIndex = index
      } else {
        const propertyNames = Object.keys(modelRef.Properties)
        propertyNames.forEach((propName, propIndex) => {
          const propRef = modelRef.Properties[propName]
          if (this.doesPropertyReferenceModel(propRef, model)) {
            delete schema.Models[index].Properties[propName]
          }
        })

        const operationNames = Object.keys(modelRef.Operations)
        operationNames.forEach((opName) => {
          const opRef = modelRef.Operations[opName]
          if (this.doesOperationReferenceModel(opRef, model)) {
            delete schema.Models[index].Operations[opName]
          }
        })
      }
    })
    if (modelIndex > -1) {
      schema.Models.splice(modelIndex, 1)
    }
    return schema
  }

  private removePropertyReferencesFromSchema(schema: CradleSchema, model: CradleModel, propertyName: string) {
    schema.Models.forEach((modelRef, modelIndex) => {
      const propertyNames = Object.keys(modelRef.Properties)
      propertyNames.forEach((propName, propIndex) => {
        const propRef = modelRef.Properties[propName]
        if (this.doesPropertyReferenceProperty(propRef, model, propertyName)) {
          delete schema.Models[modelIndex].Properties[propName]
        }
      })

      if (modelRef.Name === model.Name) {
        delete schema.Models[modelIndex].Properties[propertyName]
      }
    })

    return schema
  }

  private removeOperationFromSchema(schema: CradleSchema, model: CradleModel, operationName: string) {
    schema.Models.forEach((modelRef, modelIndex) => {
      if (modelRef.Name === model.Name) {
        delete schema.Models[modelIndex].Operations[operationName]
      }
    })
    return schema
  }

  private doesPropertyReferenceProperty(propRef: PropertyType, otherModel: CradleModel, otherPropertyName: string) {
    if (propRef.TypeName === PropertyTypes.Array) {
      const propInstance = propRef as ArrayPropertyType
      if (typeof propInstance.MemberType === 'object') {
        propRef = propInstance.MemberType as PropertyType
      }
    }

    if (propRef.TypeName === PropertyTypes.ReferenceModel) {
      const propInstance = propRef as ReferenceModelType
      if (propInstance.ModelName === otherModel.Name && propInstance.ForeignProperty === otherPropertyName) {
        return true
      }
    }
  }

  private doesPropertyReferenceModel(propRef: PropertyType, model: CradleModel) {
    if (propRef.TypeName === PropertyTypes.Array) {
      const propInstance = propRef as ArrayPropertyType
      if (typeof propInstance.MemberType === 'object') {
        propRef = propInstance.MemberType as PropertyType
      }
    }
    if (propRef.TypeName === PropertyTypes.ImportModel) {
      const propInstance = propRef as ImportModelType
      if (propInstance.ModelName === model.Name) {
        return true
      }
    }
    if (propRef.TypeName === PropertyTypes.ReferenceModel) {
      const propInstance = propRef as ReferenceModelType
      if (propInstance.ModelName === model.Name) {
        return true
      }
    }
    return false
  }

  private doesOperationReferenceModel(opRef: ICradleOperation, model: CradleModel) {
    const opArgs: PropertyType[] = Object.values(opRef.Arguments)
    return opArgs.some((propRef) => this.doesPropertyReferenceModel(propRef, model)) || this.doesPropertyReferenceModel(opRef.Returns, model)
  }
}
