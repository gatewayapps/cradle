import colors from 'colors'
import CradleModel from './CradleModel'
import CradleSchema from './CradleSchema'
import { IConsole } from './IConsole'
import ICradleLoader from './ICradleLoader'
import LoaderOptions from './LoaderOptions'
import ModelReference from './ModelReference'
import PropertyType from './PropertyTypes/PropertyType'
import SpecLoader from './SpecLoader/SpecLoader'

export abstract class CradleLoaderBase implements ICradleLoader {

  public abstract readModelReferenceNames(modelName: string): Promise<string[] >
  public abstract readModelReferenceType(modelName: string, referenceName: string): Promise<ModelReference>
  public abstract readModelPropertyType(modelName: string, propertyName: string): Promise < PropertyType >
  public abstract readModelNames(): Promise < string[] >
  public abstract readModelPropertyNames(modelName: string): Promise < string[] >
  public abstract readModelMetadata(modelName: string): Promise<object>
  public abstract prepareLoader(options: {[key: string]: any}, console: IConsole): Promise < void >

  public finalizeSchema(schema: CradleSchema): Promise<CradleSchema> {
    return Promise.resolve(schema)
  }

  public async loadSchema(): Promise < CradleSchema > {

    const schema = {}
    const models: CradleModel[] = []

    const modelNames = await this.readModelNames()

    await Promise.all(modelNames.map(async (mn) => {

        schema[mn] = {
          meta: {},
          properties: {},
          references: {},
        }
        const referenceNames = await this.readModelReferenceNames(mn)
        const propertyNames = await this.readModelPropertyNames(mn)
        await Promise.all(propertyNames.map(async (pn) => {
          const prop = await this.readModelPropertyType(mn, pn)
          schema[mn].properties[pn] = prop
        }))

        const meta = await this.readModelMetadata(mn)
        schema[mn].meta = meta

        await Promise.all(referenceNames.map(async (rn) => {
          const ref = await this.readModelReferenceType(mn, rn)
          schema[mn].references[rn] = ref
        }))

      }))

    modelNames.map((mn) => {
      models.push(new CradleModel(mn, schema[mn].properties, schema[mn].references, schema[mn].meta))
    })

    const finalSchema = new CradleSchema(models)

    return this.finalizeSchema(finalSchema)
    }

}
