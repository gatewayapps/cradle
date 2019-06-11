import { CradleModel } from '../CradleModel'
import { PropertyTypes } from './constants'
import { IPropertyTypeOptions, PropertyType } from './PropertyType'

export interface IReferenceModelTypeOptions extends IPropertyTypeOptions {
  ModelName: string
  LocalProperty: string
  ForeignProperty: string | undefined
}

export class ReferenceModelType extends PropertyType {
  public ModelName: string
  public LocalProperty: string
  public ForeignProperty: string
  public ModelType?: CradleModel

  constructor(options: IReferenceModelTypeOptions) {
    super(PropertyTypes.ReferenceModel, options)
    this.ModelName = options.ModelName

    this.LocalProperty = options.LocalProperty
    this.ForeignProperty = options.ForeignProperty || options.LocalProperty
  }
}
