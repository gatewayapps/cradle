
import chevrotain, { IToken, Lexer, Parser, TokenType } from 'chevrotain'
import ArrayPropertyType from '../PropertyTypes/ArrayPropertyType'
import SpecProperty from './SpecProperty'
const createToken = chevrotain.createToken

const PropertyType = createToken({
  name: 'PropertyType',
  pattern: /(uniqueidentifier|integer|string\(\s*\d+\s*\)|string|boolean|datetime|decimal)(\[\])?\??/i
})

const BooleanValue = createToken({
  name: 'BooleanValue',
  pattern: /(true)|(false)/i
})

const Default = createToken({
  name: 'Default',
  pattern: /default/i
})

const DecimalValue = createToken({
  name: 'DecimalValue',
  pattern: /-?\d+\.\d+/i
})

const IntegerValue = createToken({
  name: 'IntegerValue',
  pattern: /\-?\d+/i
})

const Now = createToken({
  name: 'DateTimeNowValue',
  pattern: /now/i
})

const DateTimeValue = createToken({
  name: 'DateTimeValue',
  pattern: /(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])(\D?([01]\d|2[0-3])\D?([0-5]\d)\D?([0-5]\d)?\D?(\d{3})?([zZ]|([\+-])([01]\d|2[0-3])\D?([0-5]\d)?)?)?/i
})

const Min = createToken({
  name: 'MinValue',
  pattern: /min/i
})
const Max = createToken({
  name: 'MaxValue',
  pattern: /max/i
})
const Comma = createToken({
  name: 'Comma',
  pattern: /,/i
})

const OpenParentheses = createToken({
  name: 'OpenParentheses',
  pattern: /\(/i
})
const CloseParentheses = createToken({
  name: 'CloseParentheses',
  pattern: /\)/i
})

const Allow = createToken({
  name: 'Allow',
  pattern: /allow/i
})

const Unique = createToken({
  name: 'Unique',
  pattern: /unique/i
})

const StringValue = createToken({
  name: 'StringValue',
  pattern: /"([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\'/i
})

const Auto = createToken({
  name: 'Auto',
  pattern: /auto/i
})

const Primary = createToken({
  name: 'Primary',
  pattern: /primary/i
})
const Delete = createToken({
  name: 'Delete',
  pattern: /delete/i
})
const UuidValue = createToken({
  name: 'UuidValue',
  pattern: /(?:[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)/i
})

const WhiteSpace = createToken({
  group: chevrotain.Lexer.SKIPPED,
  name: 'WhiteSpace',
  pattern: /\s+/
})
const Invalid = createToken({
  name: 'Invalid',
  pattern: /.+/
})

const allTokens = [
  StringValue,
  WhiteSpace,
  PropertyType,
  OpenParentheses,
  Comma,
  CloseParentheses,
  UuidValue,
  DateTimeValue,
  Now,
  BooleanValue,
  DecimalValue,
  IntegerValue,
  Auto,
  Unique,
  Max,
  Min,
  Default,
  Allow,
  Primary,
  Delete,
  Invalid
]

const SpecLexer = new Lexer(allTokens)

class SpecParser extends Parser {
  public propertyStatement: any
  private propertyDeclaration: any
  private defaultDeclaration: any
  private deleteDeclaration: any
  private primaryDeclaration: any
  private minDeclaration: any
  private maxDeclaration: any
  private autoDeclaration: any

  constructor(input) {
    super(input, allTokens)
    const $ = this

    $.RULE('propertyStatement', () => {
      $.SUBRULE($.propertyDeclaration)
    })
    $.RULE('propertyDeclaration', () => {
      $.CONSUME(PropertyType)
    })
    this.performSelfAnalysis()
  }
}

const localParser = new SpecParser([])

export default function ParseProperty(definition: string) {

    const lexingResult = SpecLexer.tokenize(definition)
    if (lexingResult.tokens.length === 0) {
      throw new SyntaxError('Unable to parse empty or null string')
    }
    lexingResult.tokens.map((t) => {
      if (t.tokenType!.name === Invalid.name) {
        throw new SyntaxError(`Invalid token: ${t.image}`)
      }
    })
    const propertyType = lexingResult.tokens[0].image
    const basePropertyType = propertyType.replace(/\(.+\)/ig, '').replace('?', '').replace('[]', '')

    let autoDefinition: any
    let unique: boolean = false
    let primaryKey: boolean = false
    let deleteFlag: boolean = false
    let defaultValue: any
    let length!: number
    const isArray = propertyType.indexOf('[]') > -1
    const nullable = propertyType.indexOf('?') > -1
    const strippedPropertyType = propertyType.replace(/[^0-9]/ig, '')
    if (strippedPropertyType.length > 0) {
      length = parseInt(strippedPropertyType, 10)
    }
    let allowedValues!: any

    let minValue!: any
    let maxValue!: any

    for (let i = 1; i < lexingResult.tokens.length; i++) {
      const token = lexingResult.tokens[i]
      if (token && token.tokenType) {
        switch (token.tokenType.name) {
          case Auto.name: {
            const nextToken = peekNextToken(lexingResult.tokens, i)
            if (nextToken && nextToken.tokenType!.name === OpenParentheses.name) {
              const contents = getTokensFromParentheses(lexingResult.tokens, i + 1, [IntegerValue])
              i = contents.endIndex
              autoDefinition = contents.values
            } else {
              autoDefinition = true
            }
            break
          }
          case Default.name: {
            const nextToken = peekNextToken(lexingResult.tokens, i)
            if (nextToken && nextToken.tokenType!.name === OpenParentheses.name) {
              const defaultContents = getTokensFromParentheses(lexingResult.tokens, i + 1, [IntegerValue, DecimalValue, StringValue, DateTimeValue, UuidValue, BooleanValue, Now])
              i = defaultContents.endIndex
              if (defaultContents.values.length !== 1) {
                throw new SyntaxError(`Expected default to be a single element, got ${defaultContents.values}`)
              } else {
                ensureValueTypes(basePropertyType, defaultContents.values)
                defaultValue = defaultContents.values[0]
              }
            }
            break
          }
          case Max.name: {
            const nextToken = peekNextToken(lexingResult.tokens, i)
            if (nextToken && nextToken.tokenType!.name === OpenParentheses.name) {
              const maxContents = getTokensFromParentheses(lexingResult.tokens, i + 1, [IntegerValue, DecimalValue, DateTimeValue, Now])
              i = maxContents.endIndex
              if (maxContents.values.length !== 1) {
                throw new SyntaxError(`Expected MAX value to be a single element, got ${maxContents.values}`)
              } else {
                ensureValueTypes(basePropertyType, maxContents.values)
                maxValue = maxContents.values[0]
              }
            }
            break
          }
          case Min.name: {
            const nextToken = peekNextToken(lexingResult.tokens, i)
            if (nextToken && nextToken.tokenType!.name === OpenParentheses.name) {
              const minContents = getTokensFromParentheses(lexingResult.tokens, i + 1, [IntegerValue, DecimalValue, DateTimeValue, Now])
              i = minContents.endIndex
              if (minContents.values.length !== 1) {
                throw new SyntaxError(`Expected MIN value to be a single element, got ${minContents.values}`)
              } else {
                ensureValueTypes(basePropertyType, minContents.values)
                minValue = minContents.values[0]
              }
            }
            break
          }
          case Allow.name: {
            const nextToken = peekNextToken(lexingResult.tokens, i)
            if (nextToken && nextToken.tokenType!.name === OpenParentheses.name) {
              const allowContents = getTokensFromParentheses(lexingResult.tokens, i + 1, [IntegerValue, DecimalValue, StringValue, DateTimeValue, UuidValue])
              i = allowContents.endIndex
              ensureValueTypes(basePropertyType, allowContents.values)
              allowedValues = allowContents.values

            }
            break
          }
          case Primary.name: primaryKey = true; break
          case Unique.name: unique = true; break
          case Delete.name: deleteFlag = true; break
          case Invalid.name: throw new SyntaxError(`Invalid token '${token.image}'`)
        }
      }
    }
    return  new SpecProperty(
      basePropertyType, nullable, primaryKey, unique, deleteFlag, autoDefinition, allowedValues, defaultValue, minValue,
      maxValue, length, isArray)

}

function peekNextToken(tokens: IToken[], currentIndex: number): IToken | undefined {
  const nextIndex = currentIndex + 1
  if (nextIndex < tokens.length) {
    return tokens[nextIndex]
  } else {
    return undefined
  }
}

function ensureValueTypes(propertyTypeName: string, values: any[]) {
  switch (propertyTypeName.toLowerCase()) {
    case 'string': {
      if (values.some((v) => typeof v !== 'string')) {
        throw new TypeError(`Expected ${propertyTypeName}, received ${values}`)
      } else {
        break
      }
    }
    case 'integer':
    case 'decimal': {
      if (values.some((v) => typeof v !== 'number')) {
        throw new TypeError(`Expected ${propertyTypeName}, received ${values}`)
      }
      break
    }
    case 'boolean': {
      if (values.some((v) => typeof v !== 'boolean' && typeof v !== 'number')) {
        throw new TypeError(`Expected ${propertyTypeName}, received ${values}`)
      }
      break
    }
    case 'datetime': {
      if (values.some((v) => !(v instanceof Date) && v !== 'DateTimeNow')) {
        throw new TypeError(`Expected ${propertyTypeName}, received ${values}`)
      }
      break
    }

  }
}

function getTokensFromParentheses(tokens: IToken[], startIndex: number, allowedTypes: TokenType[]) {
  const allowedTypeNames = allowedTypes.map((t) => t.name)
  const result: any[] = []
  if (startIndex >= tokens.length) {
    throw new RangeError(`Start index cannot be greater than tokens length`)

  }
  if (tokens[startIndex].tokenType!.name === OpenParentheses.name) {
    for (let i = startIndex + 1; i < tokens.length; i++) {
      if (tokens[i].tokenType!.name === CloseParentheses.name) {
        return {
          endIndex: i,
          values: result
        }
      }
      if (tokens[i].tokenType!.name !== Comma.name && allowedTypeNames.indexOf(tokens[i].tokenType!.name) === -1) {
        throw new SyntaxError(`Token type ${tokens[i].tokenType!.name} not allowed`)
      } else {
        if (tokens[i].tokenType!.name !== Comma.name) {
          const parsedTokenValue = parseTokenValue(tokens[i])

          result.push(parsedTokenValue)
        }

      }
    }
  } else {
    throw new SyntaxError(`Expected (, found ${tokens[startIndex].image}`)
  }
  throw new SyntaxError(`Missing )`)
}

function parseTokenValue(token: IToken): any {
  if (token.tokenType) {
    switch (token.tokenType.name) {
      case IntegerValue.name: {
        return parseInt(token.image, 10)
      }
      case DecimalValue.name: {
        return parseFloat(token.image)
      }
      case UuidValue.name: {
        return token.image
      }
      case StringValue.name: {
        return token.image
      }
      case BooleanValue.name: {
        return token.image.toString().toLowerCase() === 'true'
      }
      case DateTimeValue.name: {
        return new Date(token.image.toString())
      }
      case Now.name: {
        return 'DateTimeNow'
      }
    }
  }
}
