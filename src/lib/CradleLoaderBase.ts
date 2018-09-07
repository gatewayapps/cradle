import colors from 'colors'
import ICradleLoader from './ICradleLoader'
import LoaderOptions from './LoaderOptions'
import ModelReference from './ModelReference'
import PropertyType from './PropertyTypes/PropertyType'

export abstract class CradleLoaderBase implements ICradleLoader {
  public abstract readModelReferenceNames(modelName: string): Promise<string[] >
  public abstract readModelReferenceType(modelName: string, referenceName: string): Promise<ModelReference>
  public abstract readModelPropertyType(modelName: string, propertyName: string): Promise < PropertyType >
  public abstract readModelNames(): Promise < string[] >
  public abstract readModelPropertyNames(modelName: string): Promise < string[] >
  public abstract readModelMetadata(modelName: string): Promise<object>
  public abstract prepareLoader(options: LoaderOptions): Promise < void >

  public async loadSchema(): Promise < object > {

    const schema = {}

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
    return schema
    }

}
