import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'

const KNOWN_PROPERTY_TYPES = [
  'integer',
  'datetime',
  'decimal',
  'string',
  'boolean',
]

export default function parsePropertyType(typeDef: string): PropertyType {
  const parts = typeDef.split(' ', 2)
  const typeName = parts[0].toLowerCase()
  const baseTypeName = typeName.replace('?', '').trim()

  if (KNOWN_PROPERTY_TYPES.indexOf(baseTypeName) === -1) {
    throw new Error(`Invalid property type '${typeName}'`)
  }

}

function createBooleanProperty(typeName: string, def?: string): BooleanPropertyType {
  const nullable = typeName.indexOf('?') > -1

}

function getNextToken(input: string, startPosition: number = 0): {token: string, start: number, end: number} {
  let i = currentPosition
  let token = ''
  while (i < input.length) {
    if (/\b/.test(input[i])) {
      break
    } else {
      token += input[i]
      i++
    }
  }
  return {
    end: i,
    start: startPosition,
    token,
  }
}
