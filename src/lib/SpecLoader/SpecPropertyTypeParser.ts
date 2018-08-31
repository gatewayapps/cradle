
import chevrotain from 'chevrotain'
const createToken = chevrotain.createToken

const PropertyType = createToken({
  name: 'PropertyType',
  pattern: /(integer|string\(\s*\d+\s*\)|string|boolean|datetime|decimal)\??/
})

const IntegerDefault = createToken({
  name: 'IntegerDefault',
  pattern: /default\s*\(\s*-?\d+\s*\)/
})

const StringDefault  = createToken({
  name: 'StringDefault',
  pattern: /default\s*\(\s*(["'])(?:(?=(\\?))\2.)*?\1\s*\)/
})

const BooleanDefault = createToken({
  name: 'BooleanDefault',
  pattern: /default\s*\(\s*(0|1|true|false)\s*\)/
})

const DecimalDefault = createToken({
  name: 'DecimalDefault',
  pattern: /default\s*\(\s*-?\d+(\.\d+)?\s*\)/
})

// const StringAllow = createToken({
//   name: 'StringAllow',
//   pattern: /allow\s*\(\s*(["'])(?:(?=(\\?))\2.)*?\1\s*(,\s*((["'])(?:(?=(\\?))\2.)*?\1\s*))*\s*\)/
// })

const IntegerAuto = createToken({
  name: 'IntegerAuto',
  pattern: /auto\s*\(\s*-?\d+,\s*\d+\s*\)/
})

const Primary = createToken({
  name: 'Primary',
  pattern: /primary/
})
const Delete = createToken({
  name: 'Delete',
  pattern: /delete/
})
const IntegerMax = createToken({
  name: 'IntegerMax',
  pattern: /max\s*\(\s*-?\d+\s*\)/
})
const IntegerMin = createToken({
  name: 'IntegerMin',
  pattern: /min\s*\(\s*-?\d+\s*\)/
})
const DecimalMax = createToken({
  name: 'DecimalMax',
  pattern: /max\s*\(\s*-?\d+(\.\d+)?\s*\)/
})
const DecimalMin = createToken({
  name: 'DecimalMin',
  pattern: /min\s*\(\s*-?\d+(\.\d+)?\s*\)/
})
