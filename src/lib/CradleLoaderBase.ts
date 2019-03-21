import CradleModel from './CradleModel'
import CradleSchema from './CradleSchema'
import { IConsole } from './IConsole'
import ICradleLoader from './ICradleLoader'
import { ICradleOperation } from './ICradleOperation'

import PropertyType from './PropertyTypes/PropertyType'

export abstract class CradleLoaderBase implements ICradleLoader {
  protected console?: IConsole
  protected options: any
  constructor(options: { [key: string]: any }, console: IConsole) {
    this.options = options
    this.console = console
  }

  public readModelOperationNames?(modelName: string): Promise<string[]>
  public readModelOperation?(modelName: string, operationName: string): Promise<ICradleOperation>

  public abstract readModelPropertyType(modelName: string, propertyName: string): Promise<PropertyType>
  public abstract readModelNames(): Promise<string[]>
  public abstract readModelPropertyNames(modelName: string): Promise<string[]>
  public abstract readModelMetadata(modelName: string): Promise<object>
  public abstract prepareLoader?(): Promise<void>

  public finalizeSchema(schema: CradleSchema): Promise<CradleSchema> {
    return Promise.resolve(schema)
  }

  public async loadSchema(): Promise<CradleSchema> {
    const schema = {}
    const models: CradleModel[] = []

    const modelNames = await this.readModelNames()

    await Promise.all(
      modelNames.map(async (mn) => {
        schema[mn] = {
          meta: {},
          operations: {},
          properties: {}
        }
        const operationNames = (this.readModelOperationNames && (await this.readModelOperationNames(mn))) || []

        const propertyNames = await this.readModelPropertyNames(mn)
        await Promise.all(
          propertyNames.map(async (pn) => {
            const prop = await this.readModelPropertyType(mn, pn)
            schema[mn].properties[pn] = prop
          })
        )

        await Promise.all(
          operationNames.map(async (opName) => {
            const op = this.readModelOperation && (await this.readModelOperation(mn, opName))
            schema[mn].operations[opName] = op
          })
        )

        const meta = await this.readModelMetadata(mn)
        schema[mn].meta = meta
      })
    )

    modelNames.map((mn) => {
      models.push(new CradleModel(mn, schema[mn].properties, schema[mn].meta, schema[mn].operations))
    })

    const finalSchema = new CradleSchema(models)

    return this.finalizeSchema(finalSchema)
  }
}
