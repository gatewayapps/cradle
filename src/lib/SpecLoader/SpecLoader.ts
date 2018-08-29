import fs from 'fs'
import yaml from 'js-yaml'
import { IConsole } from '../IConsole'
import ICradleLoader from '../ICradleLoader'
import LoaderOptions from '../LoaderOptions'
import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'

export default class SpecLoader implements ICradleLoader {

  private console?: IConsole
  private specObject?: object

  public readModelPropertyType(modelName: string, propertyName: string): Promise < PropertyType > {
    return Promise.resolve(new BooleanPropertyType())
  }

  public readModelNames(): Promise<string[]> {
    if (this.specObject) {
    const modelNames = Object.keys(this.specObject)
    return Promise.resolve(modelNames)
    } else {
      return Promise.reject('No spec file loaded')
    }

  }

  public readModelPropertyNames(modelName: string): Promise < string[] > {
    return Promise.resolve([])
  }

  public prepareLoader(options: LoaderOptions): Promise < void > {
    // do something
    this.console = options.console
    this.console.log(options.args)
    if (!fs.existsSync(options.args)) {
      throw new Error(`Source file does not exist: ${options.args}`)
    } else {
      this.specObject = yaml.safeLoad(fs.readFileSync(options.args, 'utf8'))
    }

    return Promise.resolve()
  }
}
