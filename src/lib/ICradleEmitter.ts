import { CradleSchema } from './CradleSchema'

import { EmitterOptionsArgs } from './EmitterOptions'
import { IConsole } from './IConsole'

export interface ICradleEmitter {
  options: EmitterOptionsArgs
  console: IConsole
  prepareEmitter?()
  emitSchema(schema: CradleSchema)
  applyExclusionsToSchema(schema: CradleSchema): CradleSchema
}
export type ICradleEmitterConstructable = new (options: EmitterOptionsArgs, console: IConsole) => ICradleEmitter
