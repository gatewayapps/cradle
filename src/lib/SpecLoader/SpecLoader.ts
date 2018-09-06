import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { CradleLoaderBase } from '../CradleLoaderBase'
import { IConsole } from '../IConsole'
import ICradleLoader from '../ICradleLoader'
import LoaderOptions from '../LoaderOptions'
import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import constants from '../PropertyTypes/constants'
import DateTimePropertyType from '../PropertyTypes/DateTimePropertyType'
import DecimalPropertyType from '../PropertyTypes/DecimalPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'
import SpecProperty from './SpecProperty'
import ParseProperty from './SpecPropertyTypeParser'
import IntegerPropertyType from '../PropertyTypes/IntegerPropertyType';

export default class SpecLoader extends CradleLoaderBase  {

  private console ?: IConsole
  private specObject ?: object

  public  readModelPropertyType(modelName: string, propertyName: string): Promise < PropertyType > {
    return new Promise((resolve, reject) => {
      if (this.specObject) {
        const model = this.specObject[modelName]

        const property = model.properties[propertyName]

        if (typeof(property) === typeof('')) {

          ParseProperty(property)
          return resolve(new BooleanPropertyType())
        } else {
          return resolve(new BooleanPropertyType())
        }
      }
      return reject('Screw you creepo')

    })
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

  private createPropertyTypeFromSpecResult(spec: SpecProperty): PropertyType {
    switch (spec.PropertyType) {
      case constants.Boolean: return new BooleanPropertyType(spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.DateTime: return new DateTimePropertyType(spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.Decimal: return new DecimalPropertyType(undefined, undefined, spec.MinValue, spec.MaxValue, spec.Nullable, spec.PrimaryKey, spec.DefaultValue, spec.Unique)
      case constants.Integer: return new IntegerPropertyType(spec.MinValue, spec.MaxValue, spec.auto)
    }
  }
}
