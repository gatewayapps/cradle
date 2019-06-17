import { PropertyType } from '../PropertyTypes'
import { ICradleEmitter } from '../ICradleEmitter'

export class TypeNotSupportedError extends Error {
  constructor(emitter: ICradleEmitter, propertyType: PropertyType) {
    super(
      `Emitter type ${emitter.constructor.name} does not support property type ${propertyType.TypeName}`
    )
  }
}
