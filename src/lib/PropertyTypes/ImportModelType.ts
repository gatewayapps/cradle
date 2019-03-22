import constants from './constants'

import { CradleModel } from '../..'
import PropertyType, { IPropertyTypeOptions } from './PropertyType'

export interface IImportModelTypeOptions extends IPropertyTypeOptions {
  ModelName: string
}

export default class ImportModelType extends PropertyType {
  public ModelName: string
  public ModelType?: CradleModel

  constructor(options: IImportModelTypeOptions) {
    super(constants.ImportModel, options)
    this.ModelName = options.ModelName
  }
}
