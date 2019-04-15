import CradleSchema from './CradleSchema'
import { IConsole } from './IConsole'

export default interface ICradleEmitter {
  prepareEmitter?()
  emitSchema(schema: CradleSchema)
}
export type ICradleEmitterConstructable = new (options: any, console: IConsole) => ICradleEmitter
