import CradleModel from '../CradleModel'
import constants from './constants'
import PropertyType from './PropertyType'

export default class ReferenceModelType extends PropertyType {
  public ModelName: string
  public LocalProperty: string
  public ForeignProperty: string
  public ModelType?: CradleModel

  constructor(modelName: string, localProperty: string, foreignProperty?: string) {
    super(constants.ReferenceModel, true, false, null, false)
    this.ModelName = modelName

    this.LocalProperty = localProperty
    this.ForeignProperty = foreignProperty || localProperty
  }
}
