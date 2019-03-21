import constants from './constants'

import { CradleModel } from '../..'
import PropertyType from './PropertyType'

export default class ImportModelType extends PropertyType {
  public ModelName: string
  public ModelType?: CradleModel

  constructor(modelName: string, allowNull: boolean) {
    super(constants.ImportModel, allowNull, false, null, false)
    this.ModelName = modelName
  }
}
