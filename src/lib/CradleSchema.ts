import CradleModel from './CradleModel'

export default class CradleSchema {
  public Models: CradleModel[] = []

  constructor(models: CradleModel[]) {
    this.Models = models
  }

  public GetModel = (modelName: string) => this.Models.find((m) => m.Name === modelName)
}
