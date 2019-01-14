import CradleSchema from './CradleSchema'
import { IEmitterOptions } from './EmitterOptions'
import { IConsole } from './IConsole'

export default interface ICradleEmitter {
  prepareEmitter?()
  emitSchema(schema: CradleSchema)
}
export interface ICradleEmitterConstructable {
  new (options: any, console: IConsole): ICradleEmitter
}
