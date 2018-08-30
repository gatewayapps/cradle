import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { CradleLoaderBase } from '../CradleLoaderBase'
import { IConsole } from '../IConsole'
import ICradleLoader from '../ICradleLoader'
import LoaderOptions from '../LoaderOptions'
import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'

export default class SpecLoader extends CradleLoaderBase  {

  private console ?: IConsole
  private specObject ?: object

  public  readModelPropertyType(modelName: string, propertyName: string): Promise < PropertyType > {
    return Promise.resolve(new BooleanPropertyType())
  }

  public  readModelNames(): Promise < string[] > {
    if (this.specObject) {
    const modelNames = Object.keys(this.specObject)
    return Promise.resolve(modelNames)
    } else {
      return Promise.reject('No spec file loaded')
    }

  }

  public  readModelPropertyNames(modelName: string): Promise < string[] > {
    if (!this.specObject) {
      return Promise.reject(`No spec file loaded`)
    }
    if (!this.specObject[modelName]) {
      return Promise.reject(`The spec file does not contain a model named '${modelName}'`)
    }
    if (typeof this.specObject[modelName] === typeof('')) {
      return Promise.resolve([])
    }  else {
      if (!this.specObject[modelName].properties) {
        return Promise.reject(`Model '${modelName}' does not define any properties`)
      } else {
        return Promise.resolve(Object.keys(this.specObject[modelName].properties))
      }
    }
  }

  public async prepareLoader(options: LoaderOptions): Promise < void > {

    this.console = options.console
    this.console.log(options.args)
    if (!fs.existsSync(options.args)) {
      throw new Error(`Source file does not exist: ${options.args}`)
    } else {
      const dir = path.dirname(path.resolve(options.args))
      this.specObject = yaml.safeLoad(fs.readFileSync(options.args, 'utf8'))

      // Handle split spec files
      // This will only allow spec file references from the master file
      // meaning you can't chain together references.  This also helps prevent
      // circular references
      const modelNames = await this.readModelNames()
      modelNames.map((mn) => {
        if (this.specObject && typeof(this.specObject[mn]) === typeof('')) {
          const fileParts = this.specObject[mn].split('#')
          const filePath = path.join(dir, fileParts[0])
          const modelName = fileParts[1]

          const tempReq = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
          this.specObject[mn] = tempReq[modelName]
        }

      })

    }

    return Promise.resolve()
  }
}
