import { CradleModel } from './CradleModel'

export class CradleSchema {
  public Models: CradleModel[] = []

  constructor(models: CradleModel[]) {
    this.Models = models
  }

  public GetModel = (modelName: string) => this.Models.find((m) => m.Name === modelName)
  public GetModelIndex = (modelName: string) => this.Models.findIndex((m) => m.Name === modelName)
}
