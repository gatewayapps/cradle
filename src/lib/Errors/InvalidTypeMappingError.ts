import { PropertyType } from '../PropertyTypes'
import { ICradleEmitter } from '../ICradleEmitter'

export class InvalidTypeMappingError extends Error {
  constructor(typeMapping: string) {
    super(`No type mapping named ${typeMapping} is defined`)
  }
}
