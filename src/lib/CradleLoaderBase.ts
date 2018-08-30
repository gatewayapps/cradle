import colors from 'colors'
import ICradleLoader from './ICradleLoader'
import LoaderOptions from './LoaderOptions'
import PropertyType from './PropertyTypes/PropertyType'

export abstract class CradleLoaderBase implements ICradleLoader {
  public abstract readModelPropertyType(modelName: string, propertyName: string): Promise < PropertyType >
  public abstract readModelNames(): Promise<string[]>
  public abstract readModelPropertyNames(modelName: string): Promise < string[] >
  public abstract prepareLoader(options: LoaderOptions): Promise < void >

  public async loadSchema(): Promise <object> {
    const schema = {}
    try {
      const modelNames = await this.readModelNames()

      modelNames.map(async (mn) => {
        schema[mn] = {
          meta: {},
          properties: {},
          references: {},
        }
        const propertyNames = await this.readModelPropertyNames(mn)
        propertyNames.map(async (pn) => {
          schema[mn].properties[pn] = await this.readModelPropertyType(mn, pn)
        })

      })

    } catch (err) {
      console.log(colors.red(err))
    }
    return schema
  }

}
