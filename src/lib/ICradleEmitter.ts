import CradleSchema from './CradleSchema'
import {IEmitterOptions} from './EmitterOptions'
import { IConsole } from './IConsole'

export default interface ICradleEmitter {
  prepareEmitter(options: IEmitterOptions, console: IConsole)
  emitSchema(schema: CradleSchema)
}
